import type { PreferenceOption } from "@/features/preference/domain/model/UserPreference";
import type { AttributeCategoryItem } from "@/features/preference/infrastructure/api/dto/AttributeCategoriesResponse";

export function mapAttributeCategoriesToPreferenceOptions(
    data: readonly AttributeCategoryItem[],
): readonly PreferenceOption[] {
    return data.map((item) => ({
        id: item.id,
        categoryType: item.categoryType,
        code: item.code,
        name: item.name,
        sortOrder: item.sortOrder,
    }));
}