import { groupRecommendationApi } from "@/features/groupRecommendation/infrastructure/api/groupRecommendationApi";

import type { FinalizeGroupRecommendationRequest } from "@/features/groupRecommendation/infrastructure/api/dto/FinalizeGroupRecommendationRequest";

export async function finalizeGroupRecommendation(
    groupId: number,
    sessionId: number,
    request: FinalizeGroupRecommendationRequest,
) {
    return groupRecommendationApi.finalizeRecommendation(
        groupId,
        sessionId,
        request,
    );
}