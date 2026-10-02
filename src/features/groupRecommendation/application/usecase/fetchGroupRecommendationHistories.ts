import { groupRecommendationApi } from "@/features/groupRecommendation/infrastructure/api/groupRecommendationApi";

export async function fetchGroupRecommendationHistories(
    groupId: number,
) {
    return groupRecommendationApi.fetchRecommendationHistories(
        groupId,
    );
}