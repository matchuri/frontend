import type { GroupRecommendationStatus } from "@/features/group/domain/model/GroupRecommendationStatus";
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

export interface GroupDetailRecommendation {
    readonly sessionId: number;
    readonly status: Exclude<GroupRecommendationStatus, null>;
    readonly readiness: GroupDetailRecommendationReadiness | null;
}

export interface GroupDetail {
    readonly id: number;
    readonly name: string;
    readonly inviteCode: string;
    readonly location: GroupDetailLocation;
    readonly members: readonly GroupDetailMember[];
    readonly activeRecommendation: GroupDetailRecommendation | null;
}