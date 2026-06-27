"use client";

import { useEffect } from "react";

import { createGroupRealtimeConnection } from "@/infrastructure/sse/groupRealtimeClient";
import { GROUP_REALTIME_EVENT_TYPE } from "@/features/group/domain/model/GroupRealtimeEventType";
import type { GroupDeletedEvent } from "@/features/group/infrastructure/sse/dto/GroupDeletedEvent";

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
    readonly onMemberLeft?: () => void;
    readonly onGroupDeleted?: (event: GroupDeletedEvent) => void;
}

export function useGroupRealtimeEvents({
    accessToken,
    groupId,
    onMemberJoined,
    onMemberLeft,
    onGroupDeleted,
}: UseGroupRealtimeEventsProps) {
    useEffect(() => {
        if (!accessToken || groupId === null) {
            return;
        }

        const eventSource = createGroupRealtimeConnection(
            accessToken,
            groupId,
        ) as unknown as GroupRealtimeEventSource;

        eventSource.addEventListener(
            GROUP_REALTIME_EVENT_TYPE.CONNECTED,
            () => {
                if (process.env.NODE_ENV === "development") {
                    console.log("[GROUP SSE] connected");
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

        eventSource.addEventListener(
            GROUP_REALTIME_EVENT_TYPE.GROUP_MEMBER_LEFT,
            (event) => {
                if (process.env.NODE_ENV === "development") {
                    console.log(
                        "[GROUP SSE] GROUP_MEMBER_LEFT",
                        JSON.parse(event.data),
                    );
                }

                onMemberLeft?.();
            },
        );

        eventSource.addEventListener(
            GROUP_REALTIME_EVENT_TYPE.GROUP_DELETED,
            (event) => {
                const deletedEvent = JSON.parse(event.data) as GroupDeletedEvent;

                if (process.env.NODE_ENV === "development") {
                    console.log("[GROUP SSE] GROUP_DELETED", deletedEvent);
                }

                onGroupDeleted?.(deletedEvent);
            },
        );

        eventSource.onerror = () => {
            if (process.env.NODE_ENV === "development") {
                console.debug("그룹 실시간 이벤트 스트림 연결이 종료되었습니다.");
            }

            eventSource.close();
        };

        return () => {
            eventSource.close();
        };
    }, [
        accessToken,
        groupId,
        onMemberJoined,
        onMemberLeft,
        onGroupDeleted,
    ]);
}