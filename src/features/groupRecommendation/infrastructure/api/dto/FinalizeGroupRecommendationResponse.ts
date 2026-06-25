export interface FinalizeGroupRecommendationResponse {
    readonly success: boolean;

    readonly data: {
        readonly sessionId: number;
        readonly status: "FINALIZED";
        readonly finalCandidate: {
            readonly candidateId: number;
            readonly menuId: number;
            readonly menuName: string;
            readonly rankNo: number;
            readonly score: number;
            readonly voteCount: number;
        };
        readonly finalizedAt: string;
    };

    readonly error: {
        readonly status: number;
        readonly code: string;
        readonly message: string;
        readonly details: readonly unknown[];
    } | null;
}