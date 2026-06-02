export type RealtimeEventType =
    | "REALTIME_CONNECTED"
    | "GROUP_INVITE_CREATED"
    | "GROUP_MEMBER_JOINED"
    | "GROUP_MEMBER_LEFT"
    | "GROUP_RECOMMENDATION_STARTED"
    | "GROUP_RECOMMENDATION_READINESS_UPDATED"
    | "GROUP_RECOMMENDATION_OPENED"
    | "GROUP_RECOMMENDATION_VOTE_UPDATED"
    | "GROUP_RECOMMENDATION_VOTE_COMPLETED"
    | "GROUP_RECOMMENDATION_FINALIZED";

export interface RealtimeEventEnvelope<TPayload = unknown> {
    eventId: string;
    eventType: RealtimeEventType;
    occurredAt: string;
    groupId: number | null;
    sessionId: number | null;
    actorMemberId: number | null;
    payload: TPayload;
}

export interface RealtimeStreamMessage {
    id: string | null;
    event: string | null;
    data: string;
}

export type RealtimeStreamStatus =
    | "IDLE"
    | "CONNECTING"
    | "OPEN"
    | "CLOSED"
    | "ERROR";
