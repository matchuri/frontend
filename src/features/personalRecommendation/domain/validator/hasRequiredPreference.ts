import type { PreferenceCategory } from "@/features/preference/domain/model/PreferenceCategory";
import type { UserPreference } from "@/features/preference/domain/model/UserPreference";

const REQUIRED_PREFERENCE_CATEGORIES: readonly PreferenceCategory[] = [
    "FLAVOR",
    "COOKING_METHOD",
];

export function hasRequiredPreference(
    preference: UserPreference | null,
): boolean {
    if (!preference) return false;

    return REQUIRED_PREFERENCE_CATEGORIES.every(
        (category) => (preference.selections[category]?.length ?? 0) > 0,
    );
}