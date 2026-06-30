import type { PreferenceCategory } from "@/features/preference/domain/model/PreferenceCategory";
import type { PreferenceOption } from "@/features/preference/domain/model/UserPreference";

export interface PreferenceOptionGroup {
    readonly category: PreferenceCategory;
    readonly title: string;
    readonly description?: string;
    readonly options: readonly PreferenceOption[];
}

export interface PreferenceGroupMeta {
    readonly category: PreferenceCategory;
    readonly title: string;
    readonly description?: string;
}

export const requiredPreferenceGroupMeta: readonly PreferenceGroupMeta[] = [
    {
        category: "FLAVOR",
        title: "맛",
    },
    {
        category: "COOKING_METHOD",
        title: "조리 방식",
    },
];

export const optionalPreferenceGroupMeta: readonly PreferenceGroupMeta[] = [
    {
        category: "FOOD_CATEGORY",
        title: "음식 종류",
    },
    {
        category: "TEXTURE",
        title: "식감",
    },
    {
        category: "TEMPERATURE",
        title: "온도",
    },
];

function getOptionsByCategory(
    options: readonly PreferenceOption[],
    category: PreferenceCategory,
): readonly PreferenceOption[] {
    return options.filter((option) => option.categoryType === category);
}

export function createPreferenceGroups(
    metaList: readonly PreferenceGroupMeta[],
    options: readonly PreferenceOption[],
): readonly PreferenceOptionGroup[] {
    return metaList.map((meta) => ({
        ...meta,
        options: getOptionsByCategory(options, meta.category),
    }));
}