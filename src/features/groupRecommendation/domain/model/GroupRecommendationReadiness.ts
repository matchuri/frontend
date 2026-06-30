export type GroupRecommendationReadinessStatus =
    | "PREPARING"
    | "OPEN";

export interface GroupRecommendationReadinessProgress {
    readonly totalMemberCount: number;
    readonly readyMemberCount: number;
    readonly allReady: boolean;
}

export interface GroupRecommendationReadinessMember {
    readonly memberId: number;
    readonly nickname: string;
    readonly role: "OWNER" | "MEMBER";
    readonly ready: boolean;
}

export interface GroupRecommendationReadiness {
    readonly sessionId: number;
    readonly status: GroupRecommendationReadinessStatus;
    readonly progress: GroupRecommendationReadinessProgress;
    readonly members: readonly GroupRecommendationReadinessMember[];
}