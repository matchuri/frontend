export interface GroupRecommendationFinalizedEvent {
    readonly eventId: string;
    readonly eventType: "GROUP_RECOMMENDATION_FINALIZED";
    readonly occurredAt: string;
    readonly groupId: number;
    readonly sessionId: number;
    readonly actorMemberId: number;
    readonly payload: {
        readonly sessionId: number;
        readonly status: "FINALIZED";
        readonly finalizedAt: string;
        readonly finalCandidate: {
            readonly candidateId: number;
            readonly menuItemId: number;
            readonly menuName: string;
            readonly thumbnailUrl: string | null;
            readonly reason: string;
        };
    };
}