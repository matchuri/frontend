"use client";

import { useEffect } from "react";
import { useSetAtom } from "jotai";

import { inviteAtom } from "@/features/group/application/atoms/inviteAtom";
import { MY_REALTIME_EVENT_TYPE } from "@/features/group/domain/model/MyRealtimeEventType";
import { createMyRealtimeConnection } from "@/infrastructure/sse/myRealtimeClient";
import { mapInviteCreatedEventToModel } from "@/features/group/infrastructure/sse/mapper/myRealtimeEventMapper";
import type { GroupInviteCreatedEvent } from "@/features/group/infrastructure/sse/dto/GroupInviteCreatedEvent";
import type { GroupRecommendationVoteCompletedEvent } from "@/features/group/infrastructure/sse/dto/GroupRecommendationVoteCompletedEvent";

type MyRealtimeEventSource = {
    addEventListener: (
        eventType: string,
        listener: (event: MessageEvent<string>) => void,
    ) => void;
    close: () => void;
    onerror: ((event: unknown) => void) | null;
};

interface UseMyRealtimeEventsProps {
    readonly accessToken: string | null;
    readonly onRecommendationVoteCompleted?: (
        event: GroupRecommendationVoteCompletedEvent,
    ) => void;
}

export function useMyRealtimeEvents({
    accessToken,
    onRecommendationVoteCompleted,
}: UseMyRealtimeEventsProps) {
    const setInviteState = useSetAtom(inviteAtom);

    useEffect(() => {
        if (!accessToken) return;

        const eventSource = createMyRealtimeConnection(accessToken) as unknown as MyRealtimeEventSource;

        eventSource.addEventListener(MY_REALTIME_EVENT_TYPE.CONNECTED, () => {
            if (process.env.NODE_ENV === "development") {
                console.log("나의 실시간 이벤트 스트림 연결 완료");
            }
        });

        eventSource.addEventListener(MY_REALTIME_EVENT_TYPE.GROUP_INVITE_CREATED, (event) => {
            const inviteCreatedEvent = JSON.parse(event.data) as GroupInviteCreatedEvent;
            const newInvite = mapInviteCreatedEventToModel(inviteCreatedEvent);

            setInviteState((prev) => {
                if (prev.status !== "SUCCESS") {
                    return {
                        status: "SUCCESS",
                        data: [newInvite],
                    };
                }

                const alreadyExists = prev.data.some(
                    (invite) => invite.inviteId === newInvite.inviteId,
                );

                if (alreadyExists) {
                    return prev;
                }

                return {
                    status: "SUCCESS",
                    data: [newInvite, ...prev.data],
                };
            });
        });

        eventSource.addEventListener(
            MY_REALTIME_EVENT_TYPE.GROUP_RECOMMENDATION_VOTE_COMPLETED,
            (event) => {
                const voteCompletedEvent = JSON.parse(
                    event.data,
                ) as GroupRecommendationVoteCompletedEvent;

                if (process.env.NODE_ENV === "development") {
                    console.log(
                        "[MY SSE] GROUP_RECOMMENDATION_VOTE_COMPLETED",
                        voteCompletedEvent,
                    );
                }

                onRecommendationVoteCompleted?.(voteCompletedEvent);
            },
        );

        eventSource.onerror = (error) => {
            if (process.env.NODE_ENV === "development") {
                console.error("나의 실시간 이벤트 스트림 에러", error);
            }
        };

        return () => {
            eventSource.close();
        };
    }, [
        accessToken,
        setInviteState,
        onRecommendationVoteCompleted,
    ]);
}