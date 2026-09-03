import { httpClient } from "@/infrastructure/http/httpClient";

import type { HomeData } from "@/features/home/domain/model/Home";
import type { HomeResponse } from "@/features/home/infrastructure/api/dto/HomeResponse";

import { mapHomeResponse } from "@/features/home/infrastructure/api/mapper/homeMapper";

export const homeApi = {
    async fetchHome(): Promise<HomeData> {
        const response =
            await httpClient.get<HomeResponse>(
                "/api/v1/home",
            );

        if (!response.success || !response.data) {
            throw new Error(
                response.error?.message ??
                    "홈 정보를 불러오지 못했습니다.",
            );
        }

        return mapHomeResponse(
            response.data,
        );
    },
};