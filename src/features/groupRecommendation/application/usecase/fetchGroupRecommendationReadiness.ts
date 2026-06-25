import { groupRecommendationApi } from "@/features/groupRecommendation/infrastructure/api/groupRecommendationApi";

export async function fetchGroupRecommendationReadiness(
    groupId: number,
    sessionId: number,
) {
    return groupRecommendationApi.fetchReadiness(groupId, sessionId);
}