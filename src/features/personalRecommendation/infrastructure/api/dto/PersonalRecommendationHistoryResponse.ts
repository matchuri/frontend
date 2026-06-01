export interface PersonalRecommendationHistoryItemResponse {
    readonly id: number;
    readonly status: string;
    readonly requestedAt: string;
    readonly closedAt: string | null;
}

export interface PersonalRecommendationHistoryResponse {
    readonly success: boolean;
    readonly data: {
        readonly content: readonly PersonalRecommendationHistoryItemResponse[];
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
    } | null;
    readonly error: {
        readonly status: number;
        readonly code: string;
        readonly message: string;
        readonly details: readonly unknown[];
    } | null;
}