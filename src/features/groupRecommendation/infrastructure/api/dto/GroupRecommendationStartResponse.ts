export interface GroupRecommendationStartResponse {
    readonly success: boolean;

    readonly data: {
        readonly sessionId: number;
        readonly status: "PREPARING";
        readonly candidates: readonly [];
    };

    readonly error: {
        readonly status: number;
        readonly code: string;
        readonly message: string;
        readonly details: readonly unknown[];
    } | null;
}