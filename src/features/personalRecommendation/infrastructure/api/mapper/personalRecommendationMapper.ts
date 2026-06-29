import type { PersonalRecommendation } from "@/features/personalRecommendation/domain/model/PersonalRecommendation";

import type {
    CreatePersonalRecommendationData,
} from "@/features/personalRecommendation/infrastructure/api/dto/CreatePersonalRecommendationResponse";

export function mapPersonalRecommendation(
    data: CreatePersonalRecommendationData,
): PersonalRecommendation {
    return {
        requestId: data.requestId,
        status: data.status,
        requestedAt: data.requestedAt,
        closedAt: data.closedAt,

        candidates: data.candidates.map((candidate) => ({
            id: candidate.id,
            menuId: candidate.menuId,
            menuName: candidate.menuName,
            rankNo: candidate.rankNo,
            score: candidate.score,
            thumbnailUrl: candidate.thumbnailUrl,
        })),
    };
}