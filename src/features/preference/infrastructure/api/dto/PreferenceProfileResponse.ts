export interface PreferenceProfileAttributeCategory {
    readonly id: number;
    readonly categoryType: string;
    readonly code: string;
    readonly name: string;
    readonly sortOrder: number;
}

export interface PreferenceProfileRestrictionIngredient {
    readonly id: number;
    readonly code: string;
    readonly name: string;
    readonly allergen: boolean;
    readonly sortOrder: number;
}

export interface PreferenceProfileDislikedMenuItem {
    readonly id: number;
    readonly code: string;
    readonly name: string;
}

export interface PreferenceProfileData {
    readonly memberId: number;
    readonly profileVersion: string;
    readonly attributeCategories: readonly PreferenceProfileAttributeCategory[];
    readonly restrictionIngredients: readonly PreferenceProfileRestrictionIngredient[];
    readonly dislikedMenuItems: readonly PreferenceProfileDislikedMenuItem[];
    readonly updatedAt: string | null;
}

export interface PreferenceProfileResponse {
    readonly success: boolean;
    readonly data: PreferenceProfileData | null;
    readonly error: {
        readonly status: number;
        readonly code: string;
        readonly message: string;
        readonly details: readonly unknown[];
    } | null;
}