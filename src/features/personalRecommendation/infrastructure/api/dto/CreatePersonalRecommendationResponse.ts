export interface PersonalRecommendationCandidateResponse {
    readonly id: number;
    readonly menuId: number;
    readonly menuName: string;
    readonly rankNo: number;
    readonly score: number;
    readonly thumbnailUrl: string | null;
}

export interface CreatePersonalRecommendationData {
    readonly requestId: number;
    readonly status: string;
    readonly requestedAt: string;
    readonly closedAt: string | null;
    readonly candidates:
        readonly PersonalRecommendationCandidateResponse[];
}

export interface CreatePersonalRecommendationResponse {
    readonly success: boolean;
    readonly data: CreatePersonalRecommendationData | null;
    readonly error: {
        readonly status: number;
        readonly code: string;
        readonly message: string;
        readonly details: readonly unknown[];
    } | null;
}