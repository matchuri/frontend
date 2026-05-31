import { httpClient } from "@/infrastructure/http/httpClient";

import type {
    CreatePersonalRecommendationResponse,
} from "@/features/personalRecommendation/infrastructure/api/dto/CreatePersonalRecommendationResponse";

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
};