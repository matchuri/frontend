import { atom } from "jotai";
import type { SettingsState } from "@/features/settings/domain/state/SettingsState";

export const settingsAtom = atom<SettingsState>({
    status: "IDLE",
});