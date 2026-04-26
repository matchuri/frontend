import type { PreferenceCategory } from "@/features/preference/domain/model/PreferenceCategory";

export interface PreferenceOptionGroup {
    readonly category: PreferenceCategory;
    readonly title: string;
    readonly description?: string;
    readonly options: readonly string[];
}

export const requiredPreferenceGroups: readonly PreferenceOptionGroup[] = [
    {
        category: "FLAVOR",
        title: "맛",
        options: ["매콤", "달콤", "짭짤", "고소", "상큼", "진한/묵직한"],
    },
    {
        category: "COOKING_METHOD",
        title: "조리 방식",
        options: ["국물/탕", "구이", "튀김", "볶음", "찜", "생식/샐러드", "면/비빔"],
    },
    {
        category: "MEAL_SITUATION",
        title: "시간/상황",
        options: ["아침", "점심", "저녁", "야식", "주말", "더운 날", "비 오는 날"],
    },
];

export const optionalPreferenceGroups: readonly PreferenceOptionGroup[] = [
    {
        category: "FOOD_CATEGORY",
        title: "음식 종류",
        options: ["한식", "중식", "일식", "양식", "분식", "패스트푸드", "아시안"],
    },
    {
        category: "TEXTURE",
        title: "식감",
        options: ["바삭", "쫄깃", "아삭", "부드러움"],
    },
    {
        category: "TEMPERATURE",
        title: "온도",
        options: ["뜨거움", "차가움"],
    },
];