export interface GroupRecommendationReadinessUpdatedEvent {
    readonly eventId: string;
    readonly eventType: "GROUP_RECOMMENDATION_READINESS_UPDATED";
    readonly occurredAt: string;
    readonly groupId: number;
    readonly sessionId: number;
    readonly actorMemberId: number;
    readonly payload: {
        readonly sessionId: number;
        readonly status: "PREPARING";
        readonly readyMemberId: number;
        readonly readyMemberNickname: string;
        readonly readinessProgress: {
            readonly totalMemberCount: number;
            readonly readyMemberCount: number;
            readonly allReady: boolean;
        };
    };
}