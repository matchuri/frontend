import type { UserPreference } from "@/features/preference/domain/model/UserPreference";

const mockPreference: UserPreference = {
    selections: {
        FLAVOR: ["매콤", "고소"],
        COOKING_METHOD: [],
        MEAL_SITUATION: [],
        FOOD_CATEGORY: [],
        TEXTURE: [],
        TEMPERATURE: [],
    },
    dislikedFoods: ["땅콩"],
};

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
        return mockPreference;
    },

    async searchDislikedFoods(keyword: string): Promise<string[]> {
        return mockDislikedFoods.filter((food) => food.includes(keyword));
    },

    async savePreference(preference: UserPreference): Promise<void> {
        console.log("save preference", preference);
    },
};