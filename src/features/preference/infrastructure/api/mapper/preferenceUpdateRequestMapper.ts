import type { UserPreference } from "@/features/preference/domain/model/UserPreference";
import type { PreferenceUpdateRequest } from "@/features/preference/infrastructure/api/dto/PreferenceUpdateRequest";

export function mapUserPreferenceToUpdateRequest(
    preference: UserPreference,
): PreferenceUpdateRequest {
    const attributeCategoryIds = Object.entries(preference.selections)
        .filter(([category]) => category !== "MEAL_SITUATION")
        .flatMap(([, options]) => options.map((option) => option.id));

    const restrictionIngredientIds = preference.dislikedFoods
        .filter((food) => food.type === "RESTRICTION_INGREDIENT")
        .map((food) => food.id);

    const dislikedMenuItemIds = preference.dislikedFoods
        .filter((food) => food.type === "MENU_ITEM")
        .map((food) => food.id);

    return {
        attributeCategoryIds: Array.from(new Set(attributeCategoryIds)),
        restrictionIngredientIds: Array.from(new Set(restrictionIngredientIds)),
        dislikedMenuItemIds: Array.from(new Set(dislikedMenuItemIds)),
    };
}