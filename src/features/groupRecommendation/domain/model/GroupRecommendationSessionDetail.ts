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
    readonly thumbnailUrl: string | null;
}

export interface GroupRecommendationSessionLocation {
    readonly latitude: number;
    readonly longitude: number;
    readonly radiusMeters: number;
    readonly address: string;
}

export interface GroupRecommendationSessionCategory {
    readonly id: number;
    readonly categoryType: string;
    readonly code: string;
    readonly name: string;
    readonly rankNo: number;
    readonly source: "COMMON" | "MENU";
}

export interface GroupRecommendationSessionProgress {
    readonly totalMemberCount: number;
    readonly readyMemberCount?: number;
    readonly votedMemberCount?: number;
    readonly allReady?: boolean;
}

export interface GroupRecommendationSessionMemberVote {
    readonly memberId: number;
    readonly nickname: string;
    readonly role: "OWNER" | "MEMBER";
    readonly isMe: boolean;
    readonly voted: boolean;
    readonly candidateId: number | null;
}

export interface GroupRecommendationSessionDetail {
    readonly sessionId: number;
    readonly status: GroupRecommendationSessionStatus;
    readonly locationSnapshot: GroupRecommendationSessionLocation | null;
    readonly readiness: GroupRecommendationSessionProgress | null;
    readonly candidates: readonly GroupRecommendationSessionCandidate[];
    readonly recommendationCategories: readonly GroupRecommendationSessionCategory[] | null;
    readonly voteProgress: GroupRecommendationSessionProgress | null;
    readonly memberVotes: readonly GroupRecommendationSessionMemberVote[];
    readonly finalCandidate: GroupRecommendationSessionCandidate | null;
    readonly createdAt: string;
}