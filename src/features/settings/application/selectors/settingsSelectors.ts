import { atom } from "jotai";
import { settingsAtom } from "@/features/settings/application/atoms/settingsAtom";

export const settingsProfileAtom = atom((get) => {
    const state = get(settingsAtom);
    return state.status === "SUCCESS" ? state.data : null;
});

export const isSocialLoginAtom = atom((get) => {
    const state = get(settingsAtom);
    return state.status === "SUCCESS" && state.data.isSocial;
});

export const isLocalLoginAtom = atom((get) => {
    const state = get(settingsAtom);
    return state.status === "SUCCESS" && !state.data.isSocial;
});