export interface GroupRecommendationReadinessResponse {
    readonly success: boolean;

    readonly data: {
        readonly sessionId: number;
        readonly status: "PREPARING";
        readonly progress: {
            readonly totalMemberCount: number;
            readonly readyMemberCount: number;
            readonly allReady: boolean;
        };
        readonly members: readonly {
            readonly memberId: number;
            readonly nickname: string;
            readonly role: "OWNER" | "MEMBER";
            readonly ready: boolean;
        }[];
    };

    readonly error: {
        readonly status: number;
        readonly code: string;
        readonly message: string;
        readonly details: readonly unknown[];
    } | null;
}