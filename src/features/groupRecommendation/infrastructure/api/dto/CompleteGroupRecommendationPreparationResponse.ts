export interface CompleteGroupRecommendationPreparationResponse {
    readonly success: boolean;

    readonly data: {
        readonly sessionId: number;
        readonly status: "PREPARING" | "OPEN";
        readonly readiness: {
            readonly totalMemberCount: number;
            readonly readyMemberCount: number;
            readonly allReady: boolean;
        };
        readonly candidates: readonly {
            readonly candidateId: number;
            readonly menuId: number;
            readonly menuName: string;
            readonly rankNo: number;
            readonly score: number;
            readonly voteCount: number;
        }[];
    };

    readonly error: {
        readonly status: number;
        readonly code: string;
        readonly message: string;
        readonly details: readonly unknown[];
    } | null;
}