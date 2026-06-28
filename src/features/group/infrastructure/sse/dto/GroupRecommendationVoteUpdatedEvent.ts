export interface GroupRecommendationVoteUpdatedEvent {
    readonly eventId: string;
    readonly eventType: "GROUP_RECOMMENDATION_VOTE_UPDATED";
    readonly occurredAt: string;
    readonly groupId: number;
    readonly sessionId: number;
    readonly actorMemberId: number | null;

    readonly payload: {
        readonly sessionId: number;

        readonly voteProgress: {
            readonly totalMemberCount: number;
            readonly votedMemberCount: number;
            readonly allVoted: boolean;
        };
    };
}