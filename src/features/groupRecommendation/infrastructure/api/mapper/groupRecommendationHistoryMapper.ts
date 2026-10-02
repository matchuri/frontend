import type { GroupRecommendationHistory } from "@/features/groupRecommendation/domain/model/GroupRecommendationHistory";
import type { GroupRecommendationHistoryResponse } from "@/features/groupRecommendation/infrastructure/api/dto/GroupRecommendationHistoryResponse";

export function mapGroupRecommendationHistories(
    data: GroupRecommendationHistoryResponse["data"],
): readonly GroupRecommendationHistory[] {
    return data.content.flatMap((item) => {
        if (
            item.status !== "FINALIZED" ||
            !item.selectedMenuName ||
            !item.endedAt
        ) {
            return [];
        }

        return [
            {
                sessionId: item.sessionId,
                menuName: item.selectedMenuName,
                endedAt: item.endedAt,
            },
        ];
    });
}