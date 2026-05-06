"use client";

import { useAtomValue } from "jotai";
import { resetPasswordAtom } from "@/features/resetPassword/application/atoms/resetPasswordAtom";
import { useResetPassword } from "@/features/resetPassword/application/hooks/useResetPassword";
import ResetPasswordAccountInput from "@/features/resetPassword/ui/components/ResetPasswordAccountInput";
import ResetPasswordCodeInput from "@/features/resetPassword/ui/components/ResetPasswordCodeInput";
import ResetPasswordNewPasswordInput from "@/features/resetPassword/ui/components/ResetPasswordNewPasswordInput";
import ResetPasswordComplete from "@/features/resetPassword/ui/components/ResetPasswordComplete";

export default function ResetPasswordForm() {
    const state = useAtomValue(resetPasswordAtom);
    const resetPassword = useResetPassword();

    if (state.status === "CODE_INPUT") {
        return <ResetPasswordCodeInput {...resetPassword} />;
    }

    if (state.status === "PASSWORD_INPUT") {
        return <ResetPasswordNewPasswordInput {...resetPassword} />;
    }

    if (state.status === "COMPLETE") {
        return <ResetPasswordComplete />;
    }

    return <ResetPasswordAccountInput {...resetPassword} />;
}