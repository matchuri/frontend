export interface GroupRecommendationOpenedEvent {
    readonly eventId: string;
    readonly eventType: "GROUP_RECOMMENDATION_OPENED";
    readonly occurredAt: string;
    readonly groupId: number;
    readonly sessionId: number;
    readonly actorMemberId: number | null;
    readonly payload: {
        readonly sessionId: number;
        readonly status: "OPEN";
        readonly candidates: readonly {
            readonly candidateId: number;
            readonly menuItemId: number;
            readonly menuName: string;
            readonly reason: string;
        }[];
        readonly voteProgress: {
            readonly totalMemberCount: number;
            readonly votedMemberCount: number;
            readonly allVoted: boolean;
        };
    };
}