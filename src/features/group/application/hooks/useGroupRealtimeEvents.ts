"use client";

import { useEffect } from "react";

import { createGroupRealtimeConnection } from "@/infrastructure/sse/groupRealtimeClient";

import { GROUP_REALTIME_EVENT_TYPE } from "@/features/group/domain/model/GroupRealtimeEventType";

type GroupRealtimeEventSource = {
    readonly readyState: number;

    addEventListener: (
        eventType: string,
        listener: (event: MessageEvent<string>) => void,
    ) => void;

    close: () => void;

    onerror: ((event: unknown) => void) | null;
};

interface UseGroupRealtimeEventsProps {
    readonly accessToken: string | null;
    readonly groupId: number | null;
}

export function useGroupRealtimeEvents({
    accessToken,
    groupId,
}: UseGroupRealtimeEventsProps) {
    useEffect(() => {
        if (!accessToken || groupId === null) {
            return;
        }

        const eventSource = createGroupRealtimeConnection(
            accessToken,
            groupId,
        ) as unknown as GroupRealtimeEventSource;

        Object.values(GROUP_REALTIME_EVENT_TYPE).forEach((eventType) => {
            eventSource.addEventListener(eventType, (event) => {
                if (process.env.NODE_ENV === "development") {
                    console.log(
                        `[GROUP SSE] ${eventType}`,
                        JSON.parse(event.data),
                    );
                }
            });
        });

        eventSource.onerror = (error) => {
            if (process.env.NODE_ENV === "development") {
                console.error(
                    "그룹 실시간 이벤트 스트림 에러",
                    error,
                );
            }
        };

        return () => {
            eventSource.close();
        };
    }, [accessToken, groupId]);
}