import { groupRecommendationApi } from "@/features/groupRecommendation/infrastructure/api/groupRecommendationApi";

export async function completeGroupRecommendationPreparation(
    groupId: number,
    sessionId: number,
) {
    return groupRecommendationApi.completePreparation(
        groupId,
        sessionId,
    );
}