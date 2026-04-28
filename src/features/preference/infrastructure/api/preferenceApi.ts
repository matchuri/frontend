import { httpClient } from "@/infrastructure/http/httpClient";
import type { UserPreference } from "@/features/preference/domain/model/UserPreference";
import type { PreferenceProfileResponse } from "@/features/preference/infrastructure/api/dto/PreferenceProfileResponse";
import type { RestrictionIngredientsResponse } from "@/features/preference/infrastructure/api/dto/RestrictionIngredientsResponse";
import type { MenuItemsResponse } from "@/features/preference/infrastructure/api/dto/MenuItemsResponse";
import { mapPreferenceProfileToUserPreference } from "@/features/preference/infrastructure/api/mapper/preferenceProfileMapper";

export const preferenceApi = {
    async fetchMyPreference(): Promise<UserPreference> {
        const response = await httpClient.get<PreferenceProfileResponse>(
            "/api/v1/members/me/taste-profile",
        );

        if (!response.success || !response.data) {
            throw new Error(response.error?.message ?? "취향 정보 조회 실패");
        }

        return mapPreferenceProfileToUserPreference(response.data);
    },

    async searchDislikedFoods(keyword: string): Promise<string[]> {
        const query = encodeURIComponent(keyword);

        const [restrictionResponse, menuResponse] = await Promise.all([
            httpClient.get<RestrictionIngredientsResponse>(
                `/api/v1/restriction-ingredients?query=${query}`,
            ),
            httpClient.get<MenuItemsResponse>(
                `/api/v1/menu-items?query=${query}`,
            ),
        ]);

        if (!restrictionResponse.success || !menuResponse.success) {
            throw new Error("알레르기/비선호 음식 검색 실패");
        }

        const restrictionNames = restrictionResponse.data.map((item) => item.name);
        const menuNames = menuResponse.data.map((item) => item.name);

        return Array.from(new Set([...restrictionNames, ...menuNames]));
    },

    async savePreference(preference: UserPreference): Promise<void> {
        console.log("save preference", preference);
    },
};