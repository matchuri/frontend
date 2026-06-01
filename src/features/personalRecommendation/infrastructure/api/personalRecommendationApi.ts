import { httpClient } from "@/infrastructure/http/httpClient";

import type { PersonalRecommendationHistory } from "@/features/personalRecommendation/domain/model/PersonalRecommendationHistory";
import type { CreatePersonalRecommendationResponse } from "@/features/personalRecommendation/infrastructure/api/dto/CreatePersonalRecommendationResponse";
import type { SelectPersonalRecommendationCandidateResponse } from "@/features/personalRecommendation/infrastructure/api/dto/SelectPersonalRecommendationCandidateResponse";
import type { PersonalRecommendationHistoryResponse } from "@/features/personalRecommendation/infrastructure/api/dto/PersonalRecommendationHistoryResponse";

import { mapPersonalRecommendation } from "@/features/personalRecommendation/infrastructure/api/mapper/personalRecommendationMapper";

interface CreatePersonalRecommendationRequest {
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

    async selectCandidate(requestId: number, selectedCandidateId: number) {
        const response =
            await httpClient.patch<SelectPersonalRecommendationCandidateResponse>(
                `/api/v1/personal/recommendations/${requestId}`,
                {
                    selectedCandidateId,
                },
            );

        if (!response.success || !response.data) {
            throw new Error(
                response.error?.message ?? "추천 메뉴 선택에 실패했습니다.",
            );
        }

        return response.data;
    },

    async fetchHistories(): Promise<readonly PersonalRecommendationHistory[]> {
        const response = await httpClient.get<PersonalRecommendationHistoryResponse>(
            "/api/v1/personal/recommendations",
        );

        if (!response.success || !response.data) {
            throw new Error(
                response.error?.message ?? "개인 메뉴 추천 이력 조회에 실패했습니다.",
            );
        }

        return response.data.content.map((item) => ({
            id: item.id,
            status: item.status,
            requestedAt: item.requestedAt,
            closedAt: item.closedAt,
        }));
    },
};