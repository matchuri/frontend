import { httpClient } from "@/infrastructure/http/httpClient";
import type { UserPreference } from "@/features/preference/domain/model/UserPreference";
import type { PreferenceProfileResponse } from "@/features/preference/infrastructure/api/dto/PreferenceProfileResponse";
import { mapPreferenceProfileToUserPreference } from "@/features/preference/infrastructure/api/mapper/preferenceProfileMapper";

const mockDislikedFoods = [
    "땅콩",
    "우유",
    "계란",
    "새우",
    "게",
    "밀",
    "대두",
    "복숭아",
    "토마토",
];

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
        return mockDislikedFoods.filter((food) => food.includes(keyword));
    },

    async savePreference(preference: UserPreference): Promise<void> {
        console.log("save preference", preference);
    },
};