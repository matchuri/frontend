import type { PreferenceCategory } from "@/features/preference/domain/model/PreferenceCategory";

export interface AttributeCategoryItem {
    readonly id: number;
    readonly categoryType: PreferenceCategory;
    readonly code: string;
    readonly name: string;
    readonly sortOrder: number;
}

export interface AttributeCategoriesResponse {
    readonly success: boolean;
    readonly data: readonly AttributeCategoryItem[];
    readonly error: {
        readonly status: number;
        readonly code: string;
        readonly message: string;
        readonly details: readonly unknown[];
    } | null;
}