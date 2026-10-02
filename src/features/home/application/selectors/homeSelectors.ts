import { atom } from "jotai";
import { homeAtom } from "@/features/home/application/atoms/homeAtom";

export const homeDataAtom = atom((get) => {
    const state = get(homeAtom);

    return "data" in state
        ? state.data ?? null
        : null;
});

export const isHomeLoadingAtom = atom(
    (get) => get(homeAtom).status === "LOADING",
);

export const homeErrorMessageAtom = atom((get) => {
    const state = get(homeAtom);

    return state.status === "ERROR"
        ? state.message
        : null;
});