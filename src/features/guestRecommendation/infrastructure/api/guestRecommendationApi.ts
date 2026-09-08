import { httpClient } from "@/infrastructure/http/httpClient";

import type { GuestRecommendation } from "@/features/guestRecommendation/domain/model/GuestRecommendation";
import type { GuestRecommendationRequest } from "@/features/guestRecommendation/domain/model/GuestRecommendationRequest";
import type { GuestRecommendationResponse } from "@/features/guestRecommendation/infrastructure/api/dto/GuestRecommendationResponse";

import { mapGuestRecommendation } from "@/features/guestRecommendation/infrastructure/api/mapper/guestRecommendationMapper";

export const guestRecommendationApi = {
    async createRecommendation(
        request: GuestRecommendationRequest,
    ): Promise<GuestRecommendation> {
        const response =
            await httpClient.post<GuestRecommendationResponse>(
                "/api/v1/guest/recommendations",
                request,
            );

        if (!response.success || !response.data) {
            throw new Error(
                response.error?.message ??
                    "비회원 메뉴 추천 요청에 실패했습니다.",
            );
        }

        return mapGuestRecommendation(
            response.data,
        );
    },
};