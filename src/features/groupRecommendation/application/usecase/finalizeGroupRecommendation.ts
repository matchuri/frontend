import { groupRecommendationApi } from "@/features/groupRecommendation/infrastructure/api/groupRecommendationApi";

export async function finalizeGroupRecommendation(
    groupId: number,
    sessionId: number,
) {
    return groupRecommendationApi.finalizeRecommendation(
        groupId,
        sessionId,
    );
}