import { atom } from "jotai";

import { groupRecommendationSessionDetailAtom } from "@/features/groupRecommendation/application/atoms/groupRecommendationSessionDetailAtom";

export const groupRecommendationSessionDetailAtomValue = atom((get) => {
    const state = get(groupRecommendationSessionDetailAtom);

    return state.status === "SUCCESS" ? state.data : null;
});

export const isGroupRecommendationSessionDetailLoadingAtom = atom(
    (get) => get(groupRecommendationSessionDetailAtom).status === "LOADING",
);

export const groupRecommendationSessionDetailErrorMessageAtom = atom((get) => {
    const state = get(groupRecommendationSessionDetailAtom);

    return state.status === "ERROR" ? state.message : null;
});