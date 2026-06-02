import type { GroupRecommendationStatus } from "@/features/group/domain/model/GroupRecommendationStatus";
import type { GroupDetailMember } from "@/features/group/domain/model/GroupDetailMember";

export interface GroupDetailLocation {
    readonly latitude: number;
    readonly longitude: number;

    // TODO: 추후 서버 추가 예정
    readonly level?: number;
    readonly address?: string;
}

export interface GroupDetailRecommendation {
    readonly sessionId: number;
    readonly status: GroupRecommendationStatus;
    readonly totalMemberCount: number;
    readonly readyMemberCount: number;
    readonly allReady: boolean;
}

export interface GroupDetail {
    readonly id: number;
    readonly name: string;
    readonly inviteCode: string;
    readonly location: GroupDetailLocation;
    readonly members: readonly GroupDetailMember[];
    readonly activeRecommendation: GroupDetailRecommendation | null;
}