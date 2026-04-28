import { atom } from "jotai";
import type { PreferenceOptionState } from "@/features/preference/domain/state/PreferenceOptionState";

export const preferenceOptionAtom = atom<PreferenceOptionState>({
    status: "LOADING",
});