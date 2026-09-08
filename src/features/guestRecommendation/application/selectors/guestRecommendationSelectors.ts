import { atom } from "jotai";

import { guestRecommendationAtom } from "@/features/guestRecommendation/application/atoms/guestRecommendationAtom";

export const guestRecommendationDataAtom = atom((get) => {
    const state = get(guestRecommendationAtom);

    return state.status === "SUCCESS" ? state.data : null;
});

export const guestRecommendationCandidatesAtom = atom((get) => {
    const recommendation = get(guestRecommendationDataAtom);

    return recommendation?.candidates ?? [];
});

export const isGuestRecommendationLoadingAtom = atom((get) =>
    get(guestRecommendationAtom).status === "LOADING",
);

export const guestRecommendationErrorMessageAtom = atom((get) => {
    const state = get(guestRecommendationAtom);

    return state.status === "ERROR" ? state.message : null;
});