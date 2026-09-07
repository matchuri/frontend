import type { PersonalRecommendationHistory } from "@/features/personalRecommendation/domain/model/PersonalRecommendationHistory";
import type { PersonalRecommendationHistoryListResponse } from "@/features/personalRecommendation/infrastructure/api/dto/PersonalRecommendationHistoryListResponse";

export function mapPersonalRecommendationHistories(
    data: PersonalRecommendationHistoryListResponse["data"],
): readonly PersonalRecommendationHistory[] {
    if (!data) {
        return [];
    }

    return data.content.map((item) => ({
        id: item.id,
        status: item.status,
        requestedAt: item.requestedAt,
        closedAt: item.closedAt,
        score: item.score,
        menuName: item.menuName,
        tags: item.tags,
        thumbnailUrl: item.thumbnailUrl,
    }));
}