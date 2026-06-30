import { groupRecommendationApi } from "@/features/groupRecommendation/infrastructure/api/groupRecommendationApi";

export async function fetchGroupRecommendationSessionDetail(
    groupId: number,
    sessionId: number,
) {
    return groupRecommendationApi.fetchSessionDetail(groupId, sessionId);
}