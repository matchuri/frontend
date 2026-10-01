"use client";

import { useEffect } from "react";

import { logger } from "@/shared/lib/logger";

import { MY_REALTIME_EVENT_TYPE } from "@/features/realtime/domain/model/MyRealtimeEventType";

import type { GroupInviteCreatedEvent } from "@/features/group/infrastructure/sse/dto/GroupInviteCreatedEvent";
import type { GroupRecommendationVoteCompletedEvent } from "@/features/group/infrastructure/sse/dto/GroupRecommendationVoteCompletedEvent";

import { createMyRealtimeConnection } from "@/infrastructure/sse/myRealtimeClient";

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
    readonly onConnected?: () => void;
    readonly onGroupInviteCreated?: (event: GroupInviteCreatedEvent) => void;
    readonly onRecommendationVoteCompleted?: (
        event: GroupRecommendationVoteCompletedEvent,
    ) => void;
}

export function useMyRealtimeEvents({
    accessToken,
    onConnected,
    onGroupInviteCreated,
    onRecommendationVoteCompleted,
}: UseMyRealtimeEventsProps) {
    useEffect(() => {
        if (!accessToken) return;

        const eventSource = createMyRealtimeConnection(
            accessToken,
        ) as unknown as MyRealtimeEventSource;

        eventSource.addEventListener(
            MY_REALTIME_EVENT_TYPE.CONNECTED,
            () => {
                logger.log(
                    "나의 실시간 이벤트 스트림 연결 완료",
                );

                onConnected?.();
            },
        );

        eventSource.addEventListener(
            MY_REALTIME_EVENT_TYPE.GROUP_INVITE_CREATED,
            (event) => {
                const inviteCreatedEvent =
                    JSON.parse(
                        event.data,
                    ) as GroupInviteCreatedEvent;

                onGroupInviteCreated?.(inviteCreatedEvent);
            },
        );

        eventSource.addEventListener(
            MY_REALTIME_EVENT_TYPE.GROUP_RECOMMENDATION_VOTE_COMPLETED,
            (event) => {
                const voteCompletedEvent =
                    JSON.parse(
                        event.data,
                    ) as GroupRecommendationVoteCompletedEvent;

                logger.log(
                    "[MY SSE] GROUP_RECOMMENDATION_VOTE_COMPLETED",
                    voteCompletedEvent,
                );

                onRecommendationVoteCompleted?.(
                    voteCompletedEvent,
                );
            },
        );

        eventSource.onerror = (error) => {
            logger.error(
                "나의 실시간 이벤트 스트림 에러",
                error,
            );
        };

        return () => {
            eventSource.close();
        };
    }, [
        accessToken,
        onConnected,
        onGroupInviteCreated,
        onRecommendationVoteCompleted,
    ]);
}