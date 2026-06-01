export interface RecommendedMenu {
    readonly id: number;
    readonly menuId: number;
    readonly menuName: string;
    readonly rankNo: number;
    readonly score: number;
}

export interface PersonalRecommendation {
    readonly requestId: number;
    readonly status: string;
    readonly requestedAt: string;
    readonly closedAt: string | null;
    readonly selectedCandidateId?: number | null;
    readonly candidates: readonly RecommendedMenu[];
}