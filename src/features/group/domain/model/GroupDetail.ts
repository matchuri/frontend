import type { GroupDetailMember } from "@/features/group/domain/model/GroupDetailMember";

export interface GroupDetailLocation {
    readonly latitude: number;
    readonly longitude: number;
    readonly radiusMeters: number;
    readonly address: string;
}

export interface GroupDetailRecommendationReadiness {
    readonly totalMemberCount: number;
    readonly readyMemberCount: number;
    readonly allReady: boolean;
}

export interface GroupDetailRecommendationVoteProgress {
    readonly totalMemberCount: number;
    readonly votedMemberCount: number;
}

export interface GroupDetailRecommendationCandidate {
    readonly candidateId: number;
    readonly menuId: number;
    readonly menuName: string;
    readonly rankNo: number;
    readonly score: number;
    readonly voteCount: number;
}

export interface GroupDetailRecommendation {
    readonly sessionId: number;
    readonly status: "PREPARING" | "OPEN" | "FINALIZED";
    readonly readiness: GroupDetailRecommendationReadiness | null;
    readonly candidates: readonly GroupDetailRecommendationCandidate[];
    readonly voteProgress: GroupDetailRecommendationVoteProgress | null;
    readonly finalCandidate: GroupDetailRecommendationCandidate | null;
    readonly createdAt: string;
}

export interface GroupDetail {
    readonly id: number;
    readonly name: string;
    readonly inviteCode: string;
    readonly location: GroupDetailLocation;
    readonly members: readonly GroupDetailMember[];
    readonly activeRecommendation: GroupDetailRecommendation | null;
}