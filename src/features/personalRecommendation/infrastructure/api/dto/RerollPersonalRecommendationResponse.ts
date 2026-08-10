import type { CreatePersonalRecommendationData } from "@/features/personalRecommendation/infrastructure/api/dto/CreatePersonalRecommendationResponse";

export interface RerollPersonalRecommendationResponse {
    readonly success: boolean;
    readonly data: CreatePersonalRecommendationData | null;
    readonly error: {
        readonly status: number;
        readonly code: string;
        readonly message: string;
        readonly details: readonly unknown[];
    } | null;
}