export interface PersonalRecommendationDetailCandidateResponse {
    readonly id: number;
    readonly menuId: number;
    readonly menuName: string;
    readonly rankNo: number;
    readonly score: number;
    readonly thumbnailUrl: string | null;
}

export interface PersonalRecommendationDetailData {
    readonly id: number;
    readonly status: string;
    readonly closedAt: string | null;
    readonly contextJson: Record<string, unknown>;
    readonly candidates: readonly PersonalRecommendationDetailCandidateResponse[];
    readonly selectedCandidateId: number | null;
}

export interface PersonalRecommendationDetailResponse {
    readonly success: boolean;
    readonly data: PersonalRecommendationDetailData | null;
    readonly error: {
        readonly status: number;
        readonly code: string;
        readonly message: string;
        readonly details: readonly unknown[];
    } | null;
}