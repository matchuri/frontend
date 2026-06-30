import { atom } from "jotai";
import type { PreferenceState } from "@/features/preference/domain/state/PreferenceState";
import type { UserPreference } from "@/features/preference/domain/model/UserPreference";

export const preferenceAtom = atom<PreferenceState>({
    status: "LOADING",
});

export const originalPreferenceAtom = atom<UserPreference | null>(null);