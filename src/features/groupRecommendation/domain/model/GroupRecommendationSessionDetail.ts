export type GroupRecommendationSessionStatus =
    | "PREPARING"
    | "OPEN"
    | "FINALIZED";

export interface GroupRecommendationSessionCandidate {
    readonly candidateId: number;
    readonly menuId: number;
    readonly menuName: string;
    readonly rankNo: number;
    readonly score: number;
    readonly voteCount: number;
}

export interface GroupRecommendationSessionProgress {
    readonly totalMemberCount: number;
    readonly readyMemberCount?: number;
    readonly votedMemberCount?: number;
    readonly allReady?: boolean;
}

export interface GroupRecommendationSessionDetail {
    readonly sessionId: number;
    readonly status: GroupRecommendationSessionStatus;
    readonly readiness: GroupRecommendationSessionProgress | null;
    readonly candidates: readonly GroupRecommendationSessionCandidate[];
    readonly voteProgress: GroupRecommendationSessionProgress | null;
    readonly finalCandidate: GroupRecommendationSessionCandidate | null;
    readonly createdAt: string;
}