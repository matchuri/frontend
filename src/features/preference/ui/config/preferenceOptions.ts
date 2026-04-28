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
    {
        category: "MEAL_SITUATION",
        title: "시간/상황",
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

// TODO: 서버에 MEAL_SITUATION 추가되면 없애기
const mealSituationOptions: readonly PreferenceOption[] = [
    {
        id: -1,
        categoryType: "MEAL_SITUATION",
        code: "BREAKFAST",
        name: "아침",
    },
    {
        id: -2,
        categoryType: "MEAL_SITUATION",
        code: "LUNCH",
        name: "점심",
    },
    {
        id: -3,
        categoryType: "MEAL_SITUATION",
        code: "DINNER",
        name: "저녁",
    },
    {
        id: -4,
        categoryType: "MEAL_SITUATION",
        code: "LATE_NIGHT",
        name: "야식",
    },
];

function getOptionsByCategory(
    options: readonly PreferenceOption[],
    category: PreferenceCategory,
): readonly PreferenceOption[] {
    // TODO: 서버에 MEAL_SITUATION 추가되면 없애기
    if (category === "MEAL_SITUATION") {
        return mealSituationOptions;
    }

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