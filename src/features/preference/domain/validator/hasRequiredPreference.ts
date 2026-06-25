import type { UserPreference } from "@/features/preference/domain/model/UserPreference";
import { REQUIRED_PREFERENCE_CATEGORIES } from "@/features/preference/domain/model/requiredPreferenceCategories";

export function hasRequiredPreference(
    preference: UserPreference | null,
): boolean {
    if (!preference) return false;

    return REQUIRED_PREFERENCE_CATEGORIES.every(
        (category) => (preference.selections[category]?.length ?? 0) > 0,
    );
}