import type { UserPreference } from "@/features/preference/domain/model/UserPreference";

export function CreateEmptyPreference(): UserPreference {
    return {
        selections: {
            FLAVOR: [],
            COOKING_METHOD: [],
            FOOD_CATEGORY: [],
            TEXTURE: [],
            TEMPERATURE: [],
        },
        dislikedFoods: [],
    };
}