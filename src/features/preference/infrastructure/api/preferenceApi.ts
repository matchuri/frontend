import { httpClient } from "@/infrastructure/http/httpClient";
import type {
    DislikedFood,
    PreferenceOption,
    UserPreference,
} from "@/features/preference/domain/model/UserPreference";
import type { AttributeCategoriesResponse } from "@/features/preference/infrastructure/api/dto/AttributeCategoriesResponse";
import type { PreferenceProfileResponse } from "@/features/preference/infrastructure/api/dto/PreferenceProfileResponse";
import type { RestrictionIngredientsResponse } from "@/features/preference/infrastructure/api/dto/RestrictionIngredientsResponse";
import type { MenuItemsResponse } from "@/features/preference/infrastructure/api/dto/MenuItemsResponse";

import { mapPreferenceProfileToUserPreference } from "@/features/preference/infrastructure/api/mapper/preferenceProfileMapper";
import { mapAttributeCategoriesToPreferenceOptions } from "@/features/preference/infrastructure/api/mapper/attributeCategoryMapper";

export const preferenceApi = {
    async fetchPreferenceOptions(): Promise<readonly PreferenceOption[]> {
        const response = await httpClient.get<AttributeCategoriesResponse>(
            "/api/v1/attribute-categories",
        );

        if (!response.success) {
            throw new Error(response.error?.message ?? "취향 선택 옵션 조회 실패");
        }

        return mapAttributeCategoriesToPreferenceOptions(response.data);
    },

    async fetchMyPreference(): Promise<UserPreference> {
        const response = await httpClient.get<PreferenceProfileResponse>(
            "/api/v1/members/me/taste-profile",
        );

        if (!response.success || !response.data) {
            throw new Error(response.error?.message ?? "취향 정보 조회 실패");
        }

        return mapPreferenceProfileToUserPreference(response.data);
    },

    async searchDislikedFoods(keyword: string): Promise<DislikedFood[]> {
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

        const restrictionFoods: DislikedFood[] = restrictionResponse.data.map(
            (item) => ({
                id: item.id,
                code: item.code,
                name: item.name,
                type: "RESTRICTION_INGREDIENT",
            }),
        );

        const menuFoods: DislikedFood[] = menuResponse.data.map((item) => ({
            id: item.id,
            code: item.code,
            name: item.name,
            type: "MENU_ITEM",
        }));

        return [...restrictionFoods, ...menuFoods];
    },

    async savePreference(preference: UserPreference): Promise<void> {
        console.log("save preference", preference);
    },
};