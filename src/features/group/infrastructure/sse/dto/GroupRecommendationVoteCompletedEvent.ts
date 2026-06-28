export interface GroupRecommendationVoteCompletedEvent {
    readonly eventId: string;
    readonly eventType: "GROUP_RECOMMENDATION_VOTE_COMPLETED";
    readonly occurredAt: string;
    readonly groupId: number;
    readonly sessionId: number;
    readonly actorMemberId: null;
    readonly payload: {
        readonly sessionId: number;
        readonly voteProgress: {
            readonly totalMemberCount: number;
            readonly votedMemberCount: number;
            readonly allVoted: boolean;
        };
        readonly finalizeRequired: boolean;
    };
}