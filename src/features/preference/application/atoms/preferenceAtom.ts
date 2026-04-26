import { atom } from "jotai";
import type { PreferenceState } from "@/features/preference/domain/state/PreferenceState";

export const preferenceAtom = atom<PreferenceState>({
    status: "LOADING",
});