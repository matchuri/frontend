import { httpClient } from "@/infrastructure/http/httpClient";

import type { PersonalRecommendationRerollType } from "@/features/personalRecommendation/domain/model/PersonalRecommendationRerollType";

import type { CreatePersonalRecommendationResponse } from "@/features/personalRecommendation/infrastructure/api/dto/CreatePersonalRecommendationResponse";
import type { SelectPersonalRecommendationCandidateRequest } from "@/features/personalRecommendation/infrastructure/api/dto/SelectPersonalRecommendationCandidateRequest";
import type { SelectPersonalRecommendationCandidateResponse } from "@/features/personalRecommendation/infrastructure/api/dto/SelectPersonalRecommendationCandidateResponse";
import type { PersonalRecommendationDetailResponse } from "@/features/personalRecommendation/infrastructure/api/dto/PersonalRecommendationDetailResponse";
import type { RerollPersonalRecommendationResponse } from "@/features/personalRecommendation/infrastructure/api/dto/RerollPersonalRecommendationResponse";
import type { PersonalRecommendationHistoryListResponse } from "@/features/personalRecommendation/infrastructure/api/dto/PersonalRecommendationHistoryListResponse";

import { mapPersonalRecommendationDetail } from "@/features/personalRecommendation/infrastructure/api/mapper/personalRecommendationDetailMapper";
import { mapPersonalRecommendation } from "@/features/personalRecommendation/infrastructure/api/mapper/personalRecommendationMapper";
import { mapPersonalRecommendationHistories } from "@/features/personalRecommendation/infrastructure/api/mapper/personalRecommendationHistoryMapper";

import { logger } from "@/shared/lib/logger";

interface CreatePersonalRecommendationRequest {
    readonly contextJson: Record<string, unknown>;
}

interface RerollPersonalRecommendationRequest {
    readonly rerollType: PersonalRecommendationRerollType;
    readonly contextJson: Record<string, unknown>;
}

export const personalRecommendationApi = {
    async createRecommendation() {
        const request: CreatePersonalRecommendationRequest = {
            contextJson: {},
        };

        const response =
            await httpClient.post<CreatePersonalRecommendationResponse>(
                "/api/v1/personal/recommendations",
                request,
            );

        if (!response.success || !response.data) {
            throw new Error(
                response.error?.message ??
                    "개인 메뉴 추천 요청에 실패했습니다.",
            );
        }

        return mapPersonalRecommendation(response.data);
    },

    async selectCandidate(
        requestId: number,
        request: SelectPersonalRecommendationCandidateRequest,
    ) {
        const response =
            await httpClient.patch<SelectPersonalRecommendationCandidateResponse>(
                `/api/v1/personal/recommendations/${requestId}`,
                request,
            );

        if (!response.success || !response.data) {
            throw new Error(
                response.error?.message ?? "추천 메뉴 선택에 실패했습니다.",
            );
        }

        return response.data;
    },

    async fetchRecommendationDetail(requestId: number) {
        const response =
            await httpClient.get<PersonalRecommendationDetailResponse>(
                `/api/v1/personal/recommendations/${requestId}`,
            );

        if (!response.success || !response.data) {
            throw new Error(
                response.error?.message ?? "개인 메뉴 추천 상세 조회에 실패했습니다.",
            );
        }

        return mapPersonalRecommendationDetail(response.data);
    },

    async fetchHistories() {
        const response =
            await httpClient.get<PersonalRecommendationHistoryListResponse>(
                "/api/v2/personal/recommendations",
            );

        logger.log('개인 메뉴 추천 이력 결과:', response);

        if (!response.success || !response.data) {
            throw new Error(
                response.error?.message ??
                    "개인 메뉴 추천 이력을 불러오지 못했습니다.",
            );
        }

        return mapPersonalRecommendationHistories(
            response.data,
        );
    },

    async rerollRecommendation(
        requestId: number,
        rerollType: PersonalRecommendationRerollType,
    ) {
        const request: RerollPersonalRecommendationRequest = {
            rerollType,
            contextJson: {},
        };

        const response =
            await httpClient.post<RerollPersonalRecommendationResponse>(
                `/api/v1/personal/recommendations/${requestId}/reroll`,
                request,
            );

        if (!response.success || !response.data) {
            throw new Error(
                response.error?.message ?? "개인 메뉴 추천 재요청에 실패했습니다.",
            );
        }

        return mapPersonalRecommendation(response.data);
    },
};