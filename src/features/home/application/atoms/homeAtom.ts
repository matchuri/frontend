import { atom } from "jotai";

import type { HomeState } from "@/features/home/domain/state/HomeState";

export const homeAtom = atom<HomeState>({
    status: "IDLE",
});