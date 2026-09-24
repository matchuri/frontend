export interface GroupRecommendationHistoryResponse {
    readonly success: boolean;

    readonly data: {
        readonly content: readonly {
            readonly sessionId: number;
            readonly status: "PREPARING" | "OPEN" | "FINALIZED";
            readonly selectedMenuName: string | null;
            readonly createdAt: string;
            readonly startedAt: string | null;
            readonly endedAt: string | null;
        }[];

        readonly pageInfo: {
            readonly page: number;
            readonly size: number;
            readonly totalElements: number;
            readonly totalPages: number;
            readonly first: boolean;
            readonly last: boolean;
            readonly hasNext: boolean;
            readonly hasPrevious: boolean;
        };
    };

    readonly error: {
        readonly status: number;
        readonly code: string;
        readonly message: string;
        readonly details: readonly unknown[];
    } | null;
}