import { groupRecommendationApi } from "@/features/groupRecommendation/infrastructure/api/groupRecommendationApi";

import type { GroupRecommendationStartRequest } from "@/features/groupRecommendation/infrastructure/api/dto/GroupRecommendationStartRequest";

export async function startGroupRecommendation(
    groupId: number,
    request: GroupRecommendationStartRequest,
) {
    return groupRecommendationApi.startRecommendation(
        groupId,
        request,
    );
}