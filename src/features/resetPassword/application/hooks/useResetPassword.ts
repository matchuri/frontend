"use client";

import { useState } from "react";
import { useSetAtom } from "jotai";
import { resetPasswordAtom } from "@/features/resetPassword/application/atoms/resetPasswordAtom";

export function useResetPassword() {
    const setResetPasswordState = useSetAtom(resetPasswordAtom);

    const [loginId, setLoginId] = useState("");
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

    const handleRequestVerification = () => {
        if (!loginId.trim() || !email.trim()) return;

        setResetPasswordState({
            status: "CODE_INPUT",
        });
    };

    const handleConfirmCode = () => {
        if (!code.trim()) return;

        setResetPasswordState({
            status: "PASSWORD_INPUT",
        });
    };

    const handleResetPassword = () => {
        if (!newPassword || !newPasswordConfirm) return;
        if (newPassword !== newPasswordConfirm) return;

        setResetPasswordState({
            status: "COMPLETE",
        });
    };

    return {
        loginId,
        email,
        code,
        newPassword,
        newPasswordConfirm,
        canRequestVerification: !!loginId.trim() && !!email.trim(),
        canConfirmCode: !!code.trim(),
        canResetPassword:
            !!newPassword &&
            !!newPasswordConfirm &&
            newPassword === newPasswordConfirm,
        setLoginId,
        setEmail,
        setCode,
        setNewPassword,
        setNewPasswordConfirm,
        handleRequestVerification,
        handleConfirmCode,
        handleResetPassword,
    };
}