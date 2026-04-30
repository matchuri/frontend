import type { PreferenceCategory } from "@/features/preference/domain/model/PreferenceCategory";
import type {
    DislikedFood,
    PreferenceOption,
    UserPreference,
} from "@/features/preference/domain/model/UserPreference";
import type { PreferenceProfileData } from "@/features/preference/infrastructure/api/dto/PreferenceProfileResponse";

const preferenceCategories: readonly PreferenceCategory[] = [
    "FLAVOR",
    "COOKING_METHOD",
    "FOOD_CATEGORY",
    "TEXTURE",
    "TEMPERATURE",
];

function createEmptySelections(): UserPreference["selections"] {
    return {
        FLAVOR: [],
        COOKING_METHOD: [],
        FOOD_CATEGORY: [],
        TEXTURE: [],
        TEMPERATURE: [],
    };
}

function isPreferenceCategory(value: string): value is PreferenceCategory {
    return preferenceCategories.includes(value as PreferenceCategory);
}

export function mapPreferenceProfileToUserPreference(
    data: PreferenceProfileData,
): UserPreference {
    const selections = createEmptySelections();

    data.attributeCategories.forEach((attribute) => {
        if (!isPreferenceCategory(attribute.categoryType)) return;

        const option: PreferenceOption = {
            id: attribute.id,
            categoryType: attribute.categoryType,
            code: attribute.code,
            name: attribute.name,
            sortOrder: attribute.sortOrder,
        };

        selections[attribute.categoryType] = [
            ...selections[attribute.categoryType],
            option,
        ];
    });

    const restrictionFoods: DislikedFood[] = data.restrictionIngredients.map(
        (ingredient) => ({
            id: ingredient.id,
            code: ingredient.code,
            name: ingredient.name,
            type: "RESTRICTION_INGREDIENT",
        }),
    );

    const menuFoods: DislikedFood[] = data.dislikedMenuItems.map((menuItem) => ({
        id: menuItem.id,
        code: menuItem.code,
        name: menuItem.name,
        type: "MENU_ITEM",
    }));

    return {
        selections,
        dislikedFoods: [...restrictionFoods, ...menuFoods],
    };
}