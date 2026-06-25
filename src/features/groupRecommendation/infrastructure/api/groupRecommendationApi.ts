import { httpClient } from "@/infrastructure/http/httpClient";

import type { GroupRecommendationStartRequest } from "@/features/groupRecommendation/infrastructure/api/dto/GroupRecommendationStartRequest";
import type { GroupRecommendationStartResponse } from "@/features/groupRecommendation/infrastructure/api/dto/GroupRecommendationStartResponse";
import type { GroupRecommendationReadinessResponse } from "@/features/groupRecommendation/infrastructure/api/dto/GroupRecommendationReadinessResponse";
import type { CompleteGroupRecommendationPreparationResponse } from "@/features/groupRecommendation/infrastructure/api/dto/CompleteGroupRecommendationPreparationResponse";
import type { GroupRecommendationReadiness } from "@/features/groupRecommendation/domain/model/GroupRecommendationReadiness";

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

    async fetchReadiness(
        groupId: number,
        sessionId: number,
    ): Promise<GroupRecommendationReadiness> {
        const response =
            await httpClient.get<GroupRecommendationReadinessResponse>(
                `/api/v1/groups/${groupId}/recommendations/${sessionId}/readiness`,
            );

        if (!response.success) {
            throw new Error(
                response.error?.message ??
                    "그룹 추천 준비 상태 조회에 실패했습니다.",
            );
        }

        return response.data;
    },

    async completePreparation(
        groupId: number,
        sessionId: number,
    ) {
        const response =
            await httpClient.post<CompleteGroupRecommendationPreparationResponse>(
                `/api/v1/groups/${groupId}/recommendations/${sessionId}/ready`,
            );

        if (!response.success) {
            throw new Error(
                response.error?.message ??
                    "그룹 추천 준비 완료에 실패했습니다.",
            );
        }

        return response.data;
    },
};