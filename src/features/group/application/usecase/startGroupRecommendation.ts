import { groupRecommendationApi } from "@/features/group/infrastructure/api/groupRecommendationApi";

import type { GroupRecommendationStartRequest } from "@/features/group/infrastructure/api/dto/GroupRecommendationStartRequest";

export async function startGroupRecommendation(
    groupId: number,
    request: GroupRecommendationStartRequest,
) {
    return groupRecommendationApi.startRecommendation(
        groupId,
        request,
    );
}