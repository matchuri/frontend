import { atom } from "jotai";
import type { ResetPasswordState } from "@/features/resetPassword/domain/state/ResetPasswordState";

export const initialResetPasswordState: ResetPasswordState = {
    status: "ACCOUNT_INPUT",
};

export const resetPasswordAtom = atom<ResetPasswordState>(
    initialResetPasswordState,
);