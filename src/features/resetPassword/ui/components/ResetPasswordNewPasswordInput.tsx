"use client";

import { resetPasswordPageStyles } from "@/ui/styles/resetPasswordPageStyles";

interface ResetPasswordNewPasswordInputProps {
    readonly newPassword: string;
    readonly newPasswordConfirm: string;
    readonly message: string | null;
    readonly passwordMessage: string;
    readonly isLoading: boolean;
    readonly canResetPassword: boolean;
    readonly setNewPassword: (password: string) => void;
    readonly setNewPasswordConfirm: (password: string) => void;
    readonly handleResetPassword: () => void;
}

export default function ResetPasswordNewPasswordInput({
    newPassword,
    newPasswordConfirm,
    message,
    passwordMessage,
    isLoading,
    canResetPassword,
    setNewPassword,
    setNewPasswordConfirm,
    handleResetPassword,
}: ResetPasswordNewPasswordInputProps) {
    const passwordConfirmMessage =
        newPasswordConfirm && newPassword !== newPasswordConfirm
            ? "비밀번호가 일치하지 않습니다."
            : "";

    return (
        <div className={resetPasswordPageStyles.form}>
            <p className={resetPasswordPageStyles.description}>
                새 비밀번호를 입력하세요
            </p>

            <label className={`${resetPasswordPageStyles.label} mt-8`}>
                새 비밀번호
            </label>
            <input
                type="password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                className={resetPasswordPageStyles.input}
            />

            {passwordMessage && (
                <p className={resetPasswordPageStyles.message}>
                    {passwordMessage}
                </p>
            )}

            <label className={`${resetPasswordPageStyles.label} mt-6`}>
                새 비밀번호 확인
            </label>
            <input
                type="password"
                value={newPasswordConfirm}
                onChange={(event) =>
                    setNewPasswordConfirm(event.target.value)
                }
                className={resetPasswordPageStyles.input}
            />

            {passwordConfirmMessage && (
                <p className={resetPasswordPageStyles.message}>
                    {passwordConfirmMessage}
                </p>
            )}

            {message && (
                <p className={resetPasswordPageStyles.message}>{message}</p>
            )}

            <button
                type="button"
                onClick={handleResetPassword}
                disabled={!canResetPassword || isLoading}
                className={resetPasswordPageStyles.button}
            >
                {isLoading ? "변경 중..." : "확인"}
            </button>
        </div>
    );
}