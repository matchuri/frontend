import { atom } from "jotai";
import type { AuthState } from "@/features/auth/domain/state/AuthState";

export const authAtom = atom<AuthState>({
    status: "LOADING",
});