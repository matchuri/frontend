import { EventSourcePolyfill } from "event-source-polyfill";

import { clientEnv } from "@/infrastructure/config/env";

export function createGroupRealtimeConnection(
    accessToken: string,
    groupId: number,
) {
    return new EventSourcePolyfill(
        `${clientEnv.apiBaseUrl}/api/v1/groups/${groupId}/realtime/events`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            heartbeatTimeout: 60_000,
        },
    );
}