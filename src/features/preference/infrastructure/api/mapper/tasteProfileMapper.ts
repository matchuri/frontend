import type { PreferenceCategory } from "@/features/preference/domain/model/PreferenceCategory";
import type { UserPreference } from "@/features/preference/domain/model/UserPreference";
import type { TasteProfileData } from "@/features/preference/infrastructure/api/dto/TasteProfileResponse";

const preferenceCategories: readonly PreferenceCategory[] = [
    "FLAVOR",
    "COOKING_METHOD",
    "MEAL_SITUATION",
    "FOOD_CATEGORY",
    "TEXTURE",
    "TEMPERATURE",
];

function createEmptySelections(): UserPreference["selections"] {
    return {
        FLAVOR: [],
        COOKING_METHOD: [],
        MEAL_SITUATION: [],
        FOOD_CATEGORY: [],
        TEXTURE: [],
        TEMPERATURE: [],
    };
}

function isPreferenceCategory(value: string): value is PreferenceCategory {
    return preferenceCategories.includes(value as PreferenceCategory);
}

export function mapTasteProfileToUserPreference(
    data: TasteProfileData,
): UserPreference {
    const selections = createEmptySelections();

    data.attributeCategories.forEach((attribute) => {
        if (!isPreferenceCategory(attribute.categoryType)) return;

        selections[attribute.categoryType] = [
            ...selections[attribute.categoryType],
            attribute.name,
        ];
    });

    return {
        selections,
        dislikedFoods: [
            ...data.restrictionIngredients.map((ingredient) => ingredient.name),
            ...data.dislikedMenuItems.map((menuItem) => menuItem.name),
        ],
    };
}