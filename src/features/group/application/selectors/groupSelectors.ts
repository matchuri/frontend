import { atom } from "jotai";
import { groupAtom } from "@/features/group/application/atoms/groupAtom";

export const groupsAtom = atom((get) => {
    const state = get(groupAtom);
    return state.status === "SUCCESS" ? state.data : [];
});

export const hasGroupsAtom = atom((get) => get(groupsAtom).length > 0);

export const isGroupListLoadingAtom = atom(
    (get) => get(groupAtom).status === "LOADING",
);

export const groupListErrorMessageAtom = atom((get) => {
    const state = get(groupAtom);
    return state.status === "ERROR" ? state.message : null;
});