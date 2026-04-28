import type {
    DislikedFood,
    PreferenceOption,
    UserPreference,
} from "@/features/preference/domain/model/UserPreference";
import type { PreferenceCategory } from "@/features/preference/domain/model/PreferenceCategory";

const preferenceCategories: readonly PreferenceCategory[] = [
    "FLAVOR",
    "COOKING_METHOD",
    "MEAL_SITUATION",
    "FOOD_CATEGORY",
    "TEXTURE",
    "TEMPERATURE",
];

function normalizePreferenceOptions(
    options: readonly PreferenceOption[],
): readonly string[] {
    return options.map((option) => option.code).sort();
}

function normalizeDislikedFoods(
    foods: readonly DislikedFood[],
): readonly string[] {
    return foods
        .map((food) => `${food.type}:${food.id}`)
        .sort();
}

export function isSamePreference(
    original: UserPreference,
    current: UserPreference,
): boolean {
    for (const category of preferenceCategories) {
        const originalCodes = normalizePreferenceOptions(
            original.selections[category] ?? [],
        );
        const currentCodes = normalizePreferenceOptions(
            current.selections[category] ?? [],
        );

        if (originalCodes.length !== currentCodes.length) {
            return false;
        }

        for (let index = 0; index < originalCodes.length; index += 1) {
            if (originalCodes[index] !== currentCodes[index]) {
                return false;
            }
        }
    }

    const originalFoods = normalizeDislikedFoods(original.dislikedFoods);
    const currentFoods = normalizeDislikedFoods(current.dislikedFoods);

    if (originalFoods.length !== currentFoods.length) {
        return false;
    }

    for (let index = 0; index < originalFoods.length; index += 1) {
        if (originalFoods[index] !== currentFoods[index]) {
            return false;
        }
    }

    return true;
}