import type { PreferenceCategory } from "@/features/preference/domain/model/PreferenceCategory";

export type PreferenceSelections = Record<PreferenceCategory, readonly string[]>;

export interface UserPreference {
    readonly selections: PreferenceSelections;
    readonly dislikedFoods: readonly string[];
}