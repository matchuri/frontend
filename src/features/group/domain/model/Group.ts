export type GroupRecommendationStatus = "PREPARING" | "OPEN" | "CLOSED" | null;

export interface Group {
    readonly id: number;
    readonly name: string;
    readonly memberCount: number;
    readonly createdAt: string;
    readonly recommendationStatus: GroupRecommendationStatus;
    readonly isOwner: boolean;
}