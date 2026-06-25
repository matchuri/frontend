export interface GroupRecommendationVoteResponse {
    readonly success: boolean;

    readonly data: {
        readonly voteId: number;
        readonly candidateId: number;
        readonly votedAt: string;
    };

    readonly error: {
        readonly status: number;
        readonly code: string;
        readonly message: string;
        readonly details: readonly unknown[];
    } | null;
}