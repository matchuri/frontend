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

    readonly onMemberJoined?: () => void;
}

export function useGroupRealtimeEvents({
    accessToken,
    groupId,
    onMemberJoined,
}: UseGroupRealtimeEventsProps) {
    useEffect(() => {
        if (!accessToken || groupId === null) {
            return;
        }

        const eventSource =
            createGroupRealtimeConnection(
                accessToken,
                groupId,
            ) as unknown as GroupRealtimeEventSource;

        eventSource.addEventListener(
            GROUP_REALTIME_EVENT_TYPE.CONNECTED,
            () => {
                if (process.env.NODE_ENV === "development") {
                    console.log(
                        "[GROUP SSE] connected",
                    );
                }
            },
        );

        eventSource.addEventListener(
            GROUP_REALTIME_EVENT_TYPE.GROUP_MEMBER_JOINED,
            (event) => {
                if (process.env.NODE_ENV === "development") {
                    console.log(
                        "[GROUP SSE] GROUP_MEMBER_JOINED",
                        JSON.parse(event.data),
                    );
                }

                onMemberJoined?.();
            },
        );

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
    }, [
        accessToken,
        groupId,
        onMemberJoined,
    ]);
}