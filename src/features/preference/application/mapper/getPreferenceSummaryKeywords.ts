import type { UserPreference } from "@/features/preference/domain/model/UserPreference";

export function getPreferenceSummaryKeywords(
    preference: UserPreference | null,
): readonly string[] {
    if (!preference) return [];

    return Object.values(preference.selections)
        .flat()
        .map((option) => option.name)
        .slice(0, 5);
}