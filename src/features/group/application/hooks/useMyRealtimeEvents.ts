"use client";

import { useEffect } from "react";
import { useSetAtom } from "jotai";

import { inviteAtom } from "@/features/group/application/atoms/inviteAtom";
import { MY_REALTIME_EVENT_TYPE } from "@/features/group/domain/model/MyRealtimeEventType";
import { createMyRealtimeConnection } from "@/infrastructure/sse/myRealtimeClient";
import { mapInviteCreatedEventToModel } from "@/features/group/infrastructure/sse/mapper/myRealtimeEventMapper";
import type { GroupInviteCreatedEvent } from "@/features/group/infrastructure/sse/dto/GroupInviteCreatedEvent";

type MyRealtimeEventSource = {
    addEventListener: (
        eventType: string,
        listener: (event: MessageEvent<string>) => void,
    ) => void;
    close: () => void;
    onerror: ((event: unknown) => void) | null;
};

export function useMyRealtimeEvents(accessToken: string | null) {
    const setInviteState = useSetAtom(inviteAtom);

    useEffect(() => {
        if (!accessToken) return;

        const eventSource = createMyRealtimeConnection(accessToken) as unknown as MyRealtimeEventSource;

        eventSource.addEventListener(MY_REALTIME_EVENT_TYPE.CONNECTED, () => {
            console.log("나의 실시간 이벤트 스트림 연결 완료");
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

        eventSource.onerror = (error) => {
            console.error("나의 실시간 이벤트 스트림 에러", error);
        };

        return () => {
            eventSource.close();
        };
    }, [accessToken, setInviteState]);
}