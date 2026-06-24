import { EventSourcePolyfill } from "event-source-polyfill";
import { clientEnv } from "@/infrastructure/config/env";

export function createMyRealtimeConnection(accessToken: string) {
    return new EventSourcePolyfill(
        `${clientEnv.apiBaseUrl}/api/v1/realtime/events`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            heartbeatTimeout: 60_000,
        },
    );
}