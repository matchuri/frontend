import { atom } from "jotai";
import type { AuthState } from "@/features/auth/domain/state/AuthState";

export const authAtom = atom<AuthState>({
    status: "UNAUTHENTICATED", // 자동 로그인 기능이 있을 경우 LOADING으로 바꿔야 함
});