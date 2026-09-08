export interface GuestRecommendationCandidateResponse {
    readonly menuId: number;
    readonly menuName: string;
    readonly rankNo: number;
    readonly score: number;
}

export interface GuestRecommendationData {
    readonly candidates:
        readonly GuestRecommendationCandidateResponse[];
}

export interface GuestRecommendationResponse {
    readonly success: boolean;
    readonly data: GuestRecommendationData | null;
    readonly error: {
        readonly status: number;
        readonly code: string;
        readonly message: string;
        readonly details: readonly unknown[];
    } | null;
}