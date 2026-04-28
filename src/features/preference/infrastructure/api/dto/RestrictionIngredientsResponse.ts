export interface RestrictionIngredientItem {
    readonly id: number;
    readonly code: string;
    readonly name: string;
    readonly allergen: boolean;
    readonly sortOrder: number;
}

export interface RestrictionIngredientsResponse {
    readonly success: boolean;
    readonly data: readonly RestrictionIngredientItem[];
    readonly error: {
        readonly status: number;
        readonly code: string;
        readonly message: string;
        readonly details: readonly unknown[];
    } | null;
}