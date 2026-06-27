export interface GroupRecommendationStartedEvent {
    readonly eventId: string;
    readonly eventType: "GROUP_RECOMMENDATION_STARTED";
    readonly occurredAt: string;
    readonly groupId: number;
    readonly sessionId: number;
    readonly actorMemberId: number;
    readonly payload: {
        readonly sessionId: number;
        readonly status: "PREPARING";
        readonly readinessProgress: {
            readonly totalMemberCount: number;
            readonly readyMemberCount: number;
            readonly allReady: boolean;
        };
    };
}