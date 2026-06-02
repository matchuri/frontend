"use client";

import { useCallback, useRef, useState } from "react";
import {
    connectRealtimeStream,
    type RealtimeStreamConnection,
} from "@/features/realtime/infrastructure/sse/realtimeSseClient";
import type {
    RealtimeEventEnvelope,
    RealtimeStreamStatus,
} from "@/features/realtime/domain/model/RealtimeEvent";

interface RealtimeEventLogItem {
    receivedAt: string;
    event: RealtimeEventEnvelope;
}

interface UseRealtimeEventStreamOptions {
    accessToken: string | null;
}

export function useRealtimeEventStream({
    accessToken,
}: UseRealtimeEventStreamOptions) {
    const connectionRef = useRef<RealtimeStreamConnection | null>(null);
    const [status, setStatus] = useState<RealtimeStreamStatus>("IDLE");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [events, setEvents] = useState<RealtimeEventLogItem[]>([]);

    const close = useCallback(() => {
        connectionRef.current?.close();
        connectionRef.current = null;
        setStatus("CLOSED");
    }, []);

    const connect = useCallback(
        (path: string) => {
            if (!accessToken) {
                setStatus("ERROR");
                setErrorMessage("access token이 없습니다.");
                return;
            }

            connectionRef.current?.close();
            setStatus("CONNECTING");
            setErrorMessage(null);

            connectionRef.current = connectRealtimeStream({
                path,
                accessToken,
                onOpen: () => setStatus("OPEN"),
                onEvent: (event) => {
                    setEvents((current) => [
                        {
                            receivedAt: new Date().toISOString(),
                            event,
                        },
                        ...current,
                    ].slice(0, 50));
                },
                onError: (error) => {
                    setStatus("ERROR");
                    setErrorMessage(
                        error instanceof Error
                            ? error.message
                            : "SSE 연결 중 오류가 발생했습니다.",
                    );
                },
                onClose: () => setStatus("CLOSED"),
            });
        },
        [accessToken],
    );

    const clear = useCallback(() => setEvents([]), []);

    return {
        status,
        errorMessage,
        events,
        connect,
        close,
        clear,
    };
}
