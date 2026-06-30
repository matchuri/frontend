// 메뉴 선택 완료 응답
export interface SelectPersonalRecommendationCandidateData {
    readonly id: number;
    readonly status: string;
    readonly selectedCandidateId: number;
    readonly closedAt: string;
    readonly updatedAt: string;
}

export interface SelectPersonalRecommendationCandidateResponse {
    readonly success: boolean;
    readonly data: SelectPersonalRecommendationCandidateData | null;
    readonly error: {
        readonly status: number;
        readonly code: string;
        readonly message: string;
        readonly details: readonly unknown[];
    } | null;
}