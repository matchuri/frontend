export interface PersonalRecommendationHistory {
    readonly id: number;
    readonly status: string;
    readonly requestedAt: string;
    readonly closedAt: string | null;
    readonly score: number | null;
    readonly menuName: string | null;
    readonly tags: readonly string[];
    readonly thumbnailUrl: string | null;
}