export interface TasteProfileAttributeCategory {
    readonly id: number;
    readonly categoryType: string;
    readonly code: string;
    readonly name: string;
    readonly sortOrder: number;
}

export interface TasteProfileRestrictionIngredient {
    readonly id: number;
    readonly code: string;
    readonly name: string;
    readonly allergen: boolean;
    readonly sortOrder: number;
}

export interface TasteProfileDislikedMenuItem {
    readonly id: number;
    readonly code: string;
    readonly name: string;
}

export interface TasteProfileData {
    readonly memberId: number;
    readonly profileVersion: string;
    readonly attributeCategories: readonly TasteProfileAttributeCategory[];
    readonly restrictionIngredients: readonly TasteProfileRestrictionIngredient[];
    readonly dislikedMenuItems: readonly TasteProfileDislikedMenuItem[];
    readonly updatedAt: string | null;
}

export interface TasteProfileResponse {
    readonly success: boolean;
    readonly data: TasteProfileData | null;
    readonly error: {
        readonly status: number;
        readonly code: string;
        readonly message: string;
        readonly details: readonly unknown[];
    } | null;
}