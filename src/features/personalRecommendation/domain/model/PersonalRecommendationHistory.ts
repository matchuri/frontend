export interface PersonalRecommendationHistory {
    readonly id: number;
    readonly status: string;
    readonly requestedAt: string;
    readonly closedAt: string | null;
}