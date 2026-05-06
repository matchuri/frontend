"use client";

import { resetPasswordPageStyles } from "@/ui/styles/resetPasswordPageStyles";

interface ResetPasswordNewPasswordInputProps {
    readonly newPassword: string;
    readonly newPasswordConfirm: string;
    readonly canResetPassword: boolean;
    readonly setNewPassword: (password: string) => void;
    readonly setNewPasswordConfirm: (password: string) => void;
    readonly handleResetPassword: () => void;
}

export default function ResetPasswordNewPasswordInput({
    newPassword,
    newPasswordConfirm,
    canResetPassword,
    setNewPassword,
    setNewPasswordConfirm,
    handleResetPassword,
}: ResetPasswordNewPasswordInputProps) {
    return (
        <div className={resetPasswordPageStyles.form}>
            <p className={resetPasswordPageStyles.description}>
                새 비밀번호를 입력하세요
            </p>

            <label className={resetPasswordPageStyles.label}>새 비밀번호</label>
            <input
                type="password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                className={resetPasswordPageStyles.input}
            />

            <label className={resetPasswordPageStyles.label}>
                새 비밀번호 확인
            </label>
            <input
                type="password"
                value={newPasswordConfirm}
                onChange={(event) => setNewPasswordConfirm(event.target.value)}
                className={resetPasswordPageStyles.input}
            />

            <button
                type="button"
                onClick={handleResetPassword}
                disabled={!canResetPassword}
                className={resetPasswordPageStyles.button}
            >
                확인
            </button>
        </div>
    );
}