export interface PreferenceUpdateRequest {
    readonly attributeCategoryIds: readonly number[];
    readonly restrictionIngredientIds: readonly number[];
    readonly dislikedMenuItemIds: readonly number[];
}