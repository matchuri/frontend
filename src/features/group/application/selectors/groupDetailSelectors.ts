import { atom } from "jotai";
import { groupDetailAtom } from "@/features/group/application/atoms/groupDetailAtom";

export const groupDetailAtomValue = atom((get) => {
    const state = get(groupDetailAtom);
    return state.status === "SUCCESS" ? state.data : null;
});

export const isGroupDetailLoadingAtom = atom(
    (get) => get(groupDetailAtom).status === "LOADING",
);

export const groupDetailErrorMessageAtom = atom((get) => {
    const state = get(groupDetailAtom);
    return state.status === "ERROR" ? state.message : null;
});