import type { GroupRecommendationStatus } from "@/features/group/domain/model/GroupRecommendationStatus";

export interface Group {
    readonly id: number;
    readonly name: string;
    readonly memberCount: number;
    readonly createdAt: string;
    readonly recommendationStatus: GroupRecommendationStatus;
    readonly isOwner: boolean;
}