import type { PreferenceSelectionIds } from "@/features/preference/domain/model/PreferenceSelectionIds";
import type { UserPreference } from "@/features/preference/domain/model/UserPreference";

export function mapPreferenceToSelectionIds(
    preference: UserPreference,
): PreferenceSelectionIds {
    const attributeCategoryIds = Object.values(preference.selections)
        .flatMap((options) => options.map((option) => option.id));

    const restrictionIngredientIds = preference.dislikedFoods
        .filter((food) => food.type === "RESTRICTION_INGREDIENT")
        .map((food) => food.id);

    const dislikedMenuItemIds = preference.dislikedFoods
        .filter((food) => food.type === "MENU_ITEM")
        .map((food) => food.id);

    return {
        attributeCategoryIds: [
            ...new Set(attributeCategoryIds),
        ],
        restrictionIngredientIds: [
            ...new Set(restrictionIngredientIds),
        ],
        dislikedMenuItemIds: [
            ...new Set(dislikedMenuItemIds),
        ],
    };
}