"use client";

import { useState } from "react";
import { useSetAtom } from "jotai";
import { resetPasswordAtom } from "@/features/resetPassword/application/atoms/resetPasswordAtom";
import { requestPasswordVerification } from "@/features/resetPassword/application/usecase/requestPasswordVerification";
import { confirmPasswordVerification } from "@/features/resetPassword/application/usecase/confirmPasswordVerification";
import { resetPassword } from "@/features/resetPassword/application/usecase/resetPassword";
import { validateResetPassword } from "@/features/resetPassword/domain/validator/validateResetPassword";

export function useResetPassword() {
    const setResetPasswordState = useSetAtom(resetPasswordAtom);

    const [loginId, setLoginId] = useState("");
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

    const [remainingSeconds, setRemainingSeconds] = useState<number | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const passwordValidationResult = validateResetPassword(newPassword);

    const passwordMessage =
        passwordValidationResult.success ? "" : passwordValidationResult.message;

    const isPasswordValid = passwordValidationResult.success;

    const isPasswordConfirmMatched =
        !!newPasswordConfirm && newPassword === newPasswordConfirm;

    const handleExpired = () => {
        setMessage("인증 시간이 만료되었습니다. 다시 시도해주세요.");
    };

    const handleRequestVerification = async () => {
        setIsLoading(true);
        setMessage(null);

        const result = await requestPasswordVerification({
            loginId,
            email,
        });

        setIsLoading(false);

        if (!result.success) {
            setMessage(result.message);
            return;
        }

        setRemainingSeconds(300);

        setResetPasswordState({
            status: "CODE_INPUT",
        });
    };

    const handleConfirmCode = async () => {
        if (remainingSeconds === 0) {
            setMessage("인증 시간이 만료되었습니다. 다시 시도해주세요.");
            return;
        }

        setIsLoading(true);
        setMessage(null);

        const result = await confirmPasswordVerification({
            loginId,
            email,
            code,
        });

        setIsLoading(false);

        if (!result.success) {
            setMessage(result.message);
            return;
        }

        setRemainingSeconds(null);

        setResetPasswordState({
            status: "PASSWORD_INPUT",
        });
    };

    const handleResetPassword = async () => {
        if (!isPasswordValid) {
            setMessage(passwordMessage);
            return;
        }

        if (!isPasswordConfirmMatched) {
            setMessage("비밀번호가 일치하지 않습니다.");
            return;
        }

        setIsLoading(true);
        setMessage(null);

        const result = await resetPassword({
            newPassword,
            newPasswordConfirm,
        });

        setIsLoading(false);

        if (!result.success) {
            setMessage(result.message);
            return;
        }

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
        remainingSeconds,
        message,
        passwordMessage,
        isPasswordValid,
        isLoading,
        canRequestVerification: !!loginId.trim() && !!email.trim(),
        canConfirmCode: !!code.trim() && remainingSeconds !== 0,
        canResetPassword: isPasswordValid && isPasswordConfirmMatched,
        setLoginId,
        setEmail,
        setCode,
        setNewPassword,
        setNewPasswordConfirm,
        setRemainingSeconds,
        handleExpired,
        handleRequestVerification,
        handleConfirmCode,
        handleResetPassword,
    };
}