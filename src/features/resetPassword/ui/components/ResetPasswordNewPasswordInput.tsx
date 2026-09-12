"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { authPageStyles } from "@/ui/styles/authPageStyles";

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
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isPasswordConfirmVisible, setIsPasswordConfirmVisible] =
        useState(false);

    const passwordConfirmMessage =
        newPasswordConfirm && newPassword !== newPasswordConfirm
            ? "비밀번호가 일치하지 않습니다."
            : "";

    return (
        <div>
            <div className={authPageStyles.intro}>
                <h1 className={authPageStyles.title}>비밀번호 찾기</h1>

                <p className={authPageStyles.description}>
                    새로운 비밀번호를 입력해 주세요.
                </p>
            </div>

            <div className={authPageStyles.form}>
                <div className={authPageStyles.inputGroup}>
                    <label className={authPageStyles.label}>
                        새 비밀번호
                    </label>

                    <div className={authPageStyles.passwordInputWrapper}>
                        <input
                            type={isPasswordVisible ? "text" : "password"}
                            value={newPassword}
                            onChange={(event) => setNewPassword(event.target.value)}
                            className={`${authPageStyles.input} ${authPageStyles.passwordInput}`}
                            placeholder="새 비밀번호를 입력하세요"
                        />

                        <button
                            type="button"
                            onClick={() => setIsPasswordVisible((prev) => !prev)}
                            className={authPageStyles.passwordToggle}
                            aria-label={isPasswordVisible ? "비밀번호 숨기기" : "비밀번호 보기"}
                        >
                            {isPasswordVisible ? (
                                <EyeOff size={20} />
                            ) : (
                                <Eye size={20} />
                            )}
                        </button>
                    </div>

                    {passwordMessage && (
                        <p className={authPageStyles.message}>
                            {passwordMessage}
                        </p>
                    )}
                </div>

                <div className={authPageStyles.inputGroup}>
                    <label className={authPageStyles.label}>
                        새 비밀번호 확인
                    </label>

                    <div className={authPageStyles.passwordInputWrapper}>
                        <input
                            type={isPasswordConfirmVisible ? "text" : "password"}
                            value={newPasswordConfirm}
                            onChange={(event) => setNewPasswordConfirm(event.target.value)}
                            className={`${authPageStyles.input} ${authPageStyles.passwordInput}`}
                            placeholder="새 비밀번호를 다시 입력하세요"
                        />

                        <button
                            type="button"
                            onClick={() => setIsPasswordConfirmVisible((prev) => !prev)}
                            className={authPageStyles.passwordToggle}
                            aria-label={isPasswordConfirmVisible ? "비밀번호 숨기기" : "비밀번호 보기"}
                        >
                            {isPasswordConfirmVisible ? (
                                <EyeOff size={20} />
                            ) : (
                                <Eye size={20} />
                            )}
                        </button>
                    </div>

                    {passwordConfirmMessage && (
                        <p className={authPageStyles.message}>
                            {passwordConfirmMessage}
                        </p>
                    )}
                </div>

                {message && (
                    <p className={authPageStyles.message}>{message}</p>
                )}

                <button
                    type="button"
                    onClick={handleResetPassword}
                    disabled={!canResetPassword || isLoading}
                    className={authPageStyles.primaryButton}
                >
                    {isLoading ? "변경 중..." : "확인"}
                </button>
            </div>
        </div>
    );
}