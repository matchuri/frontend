import { atom } from "jotai";
import { personalRecommendationAtom } from "@/features/personalRecommendation/application/atoms/personalRecommendationAtom";

export const isPersonalRecommendationLoadingAtom = atom(
    (get) => get(personalRecommendationAtom).status === "LOADING",
);

export const personalRecommendationResultAtom = atom((get) => {
    const state = get(personalRecommendationAtom);

    return state.status === "SUCCESS"
        ? state.data
        : null;
});

export const personalRecommendationErrorAtom = atom((get) => {
    const state = get(personalRecommendationAtom);

    return state.status === "ERROR"
        ? state.message
        : null;
});