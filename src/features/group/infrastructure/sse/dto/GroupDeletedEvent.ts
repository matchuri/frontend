export interface GroupDeletedEvent {
    readonly eventId: string;
    readonly eventType: "GROUP_DELETED";
    readonly occurredAt: string;
    readonly groupId: number;
    readonly sessionId: null;
    readonly actorMemberId: number;
    readonly payload: {
        readonly groupId: number;
        readonly deletedByMemberId: number;
        readonly deletedAt: string;
    };
}