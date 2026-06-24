import { httpClient } from "@/infrastructure/http/httpClient";

import type { GroupRecommendationStartRequest } from "./dto/GroupRecommendationStartRequest";
import type { GroupRecommendationStartResponse } from "./dto/GroupRecommendationStartResponse";

export const groupRecommendationApi = {
    async startRecommendation(
        groupId: number,
        request: GroupRecommendationStartRequest,
    ) {
        const response =
            await httpClient.post<GroupRecommendationStartResponse>(
                `/api/v1/groups/${groupId}/recommendations`,
                request,
            );

        if (!response.success) {
            throw new Error(
                response.error?.message ??
                    "그룹 추천 시작에 실패했습니다.",
            );
        }

        return response.data;
    },
};