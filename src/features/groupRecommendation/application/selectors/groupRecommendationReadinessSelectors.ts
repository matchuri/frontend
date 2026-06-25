import { atom } from "jotai";

import { groupRecommendationReadinessAtom } from "@/features/groupRecommendation/application/atoms/groupRecommendationReadinessAtom";

export const groupRecommendationReadinessAtomValue = atom((get) => {
    const state = get(groupRecommendationReadinessAtom);

    return state.status === "SUCCESS" ? state.data : null;
});

export const isGroupRecommendationReadinessLoadingAtom = atom(
    (get) => get(groupRecommendationReadinessAtom).status === "LOADING",
);

export const groupRecommendationReadinessErrorMessageAtom = atom((get) => {
    const state = get(groupRecommendationReadinessAtom);

    return state.status === "ERROR" ? state.message : null;
});

// 준비 진행률
export const groupRecommendationReadinessProgressAtom = atom((get) => {
    return get(groupRecommendationReadinessAtomValue)?.progress ?? null;
});

// 멤버 준비 상태 목록
export const groupRecommendationReadinessMembersAtom = atom((get) => {
    return get(groupRecommendationReadinessAtomValue)?.members ?? [];
});