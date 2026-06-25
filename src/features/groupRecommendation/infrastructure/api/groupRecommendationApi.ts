import { httpClient } from "@/infrastructure/http/httpClient";

import type { GroupRecommendationStartRequest } from "@/features/groupRecommendation/infrastructure/api/dto/GroupRecommendationStartRequest";
import type { GroupRecommendationStartResponse } from "@/features/groupRecommendation/infrastructure/api/dto/GroupRecommendationStartResponse";
import type { GroupRecommendationReadinessResponse } from "@/features/groupRecommendation/infrastructure/api/dto/GroupRecommendationReadinessResponse";
import type { CompleteGroupRecommendationPreparationResponse } from "@/features/groupRecommendation/infrastructure/api/dto/CompleteGroupRecommendationPreparationResponse";
import type { GroupRecommendationSessionDetailResponse } from "@/features/groupRecommendation/infrastructure/api/dto/GroupRecommendationSessionDetailResponse";
import type { GroupRecommendationVoteRequest } from "@/features/groupRecommendation/infrastructure/api/dto/GroupRecommendationVoteRequest";
import type { GroupRecommendationVoteResponse } from "@/features/groupRecommendation/infrastructure/api/dto/GroupRecommendationVoteResponse";
import type { FinalizeGroupRecommendationResponse } from "@/features/groupRecommendation/infrastructure/api/dto/FinalizeGroupRecommendationResponse";

import type { GroupRecommendationReadiness } from "@/features/groupRecommendation/domain/model/GroupRecommendationReadiness";
import type { GroupRecommendationSessionDetail } from "@/features/groupRecommendation/domain/model/GroupRecommendationSessionDetail";

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

    async fetchSessionDetail(
        groupId: number,
        sessionId: number,
    ): Promise<GroupRecommendationSessionDetail> {
        const response =
            await httpClient.get<GroupRecommendationSessionDetailResponse>(
                `/api/v1/groups/${groupId}/recommendations/${sessionId}`,
            );

        if (!response.success) {
            throw new Error(
                response.error?.message ??
                    "그룹 추천 세션 상세 조회에 실패했습니다.",
            );
        }

        return response.data;
    },

    async voteCandidate(
        groupId: number,
        sessionId: number,
        request: GroupRecommendationVoteRequest,
    ) {
        const response =
            await httpClient.post<GroupRecommendationVoteResponse>(
                `/api/v1/groups/${groupId}/recommendations/${sessionId}/votes`,
                request,
            );

        if (!response.success) {
            throw new Error(
                response.error?.message ??
                    "메뉴 후보 투표에 실패했습니다.",
            );
        }

        return response.data;
    },

    async finalizeRecommendation(
        groupId: number,
        sessionId: number,
    ) {
        const response =
            await httpClient.patch<FinalizeGroupRecommendationResponse>(
                `/api/v1/groups/${groupId}/recommendations/${sessionId}/finalize`,
            );

        if (!response.success) {
            throw new Error(
                response.error?.message ??
                    "그룹 추천 최종 메뉴 확정에 실패했습니다.",
            );
        }

        return response.data;
    },
};