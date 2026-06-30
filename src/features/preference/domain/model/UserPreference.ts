import type { PreferenceCategory } from "@/features/preference/domain/model/PreferenceCategory";

export interface PreferenceOption {
    readonly id: number;
    readonly categoryType: PreferenceCategory;
    readonly code: string;
    readonly name: string;
    readonly sortOrder?: number;
}

export interface DislikedFood {
    readonly id: number;
    readonly code: string;
    readonly name: string;
    readonly type: "RESTRICTION_INGREDIENT" | "MENU_ITEM";
}

export type PreferenceSelections = Record<
    PreferenceCategory,
    readonly PreferenceOption[]
>;

export interface UserPreference {
    readonly selections: PreferenceSelections;
    readonly dislikedFoods: readonly DislikedFood[];
}