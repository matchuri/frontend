import { atom } from "jotai";
import { preferenceAtom } from "@/features/preference/application/atoms/preferenceAtom";

export const userPreferenceAtom = atom((get) => {
    const state = get(preferenceAtom);
    return state.status === "SUCCESS" ? state.data : null;
});

export const preferenceSelectionsAtom = atom((get) => {
    const state = get(preferenceAtom);
    return state.status === "SUCCESS" ? state.data.selections : null;
});

export const dislikedFoodsAtom = atom((get) => {
    const state = get(preferenceAtom);
    return state.status === "SUCCESS" ? state.data.dislikedFoods : [];
});

export const isPreferenceLoadingAtom = atom(
    (get) => get(preferenceAtom).status === "LOADING",
);

export const preferenceErrorAtom = atom((get) => {
    const state = get(preferenceAtom);
    return state.status === "ERROR" ? state.message : null;
});