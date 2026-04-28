import { httpClient } from "@/infrastructure/http/httpClient";
import type { UserPreference } from "@/features/preference/domain/model/UserPreference";
import type { TasteProfileResponse } from "@/features/preference/infrastructure/api/dto/TasteProfileResponse";
import { mapTasteProfileToUserPreference } from "@/features/preference/infrastructure/api/mapper/tasteProfileMapper";

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
        const response = await httpClient.get<TasteProfileResponse>(
            "/api/v1/members/me/taste-profile",
        );

        if (!response.success || !response.data) {
            throw new Error(response.error?.message ?? "취향 정보 조회 실패");
        }

        return mapTasteProfileToUserPreference(response.data);
    },

    async searchDislikedFoods(keyword: string): Promise<string[]> {
        return mockDislikedFoods.filter((food) => food.includes(keyword));
    },

    async savePreference(preference: UserPreference): Promise<void> {
        console.log("save preference", preference);
    },
};