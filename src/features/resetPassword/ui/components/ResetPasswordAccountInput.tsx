"use client";

import { resetPasswordPageStyles } from "@/ui/styles/resetPasswordPageStyles";

interface ResetPasswordAccountInputProps {
    readonly loginId: string;
    readonly email: string;
    readonly message: string | null;
    readonly isLoading: boolean;
    readonly canRequestVerification: boolean;
    readonly setLoginId: (loginId: string) => void;
    readonly setEmail: (email: string) => void;
    readonly handleRequestVerification: () => void;
}

export default function ResetPasswordAccountInput({
    loginId,
    email,
    message,
    isLoading,
    canRequestVerification,
    setLoginId,
    setEmail,
    handleRequestVerification,
}: ResetPasswordAccountInputProps) {
    return (
        <div className={resetPasswordPageStyles.form}>
            <p className={resetPasswordPageStyles.description}>
                가입한 아이디와 이메일을 입력하세요
            </p>

            <label className={`${resetPasswordPageStyles.label} mt-8`}>
                아이디
            </label>
            <input
                type="text"
                value={loginId}
                onChange={(event) => setLoginId(event.target.value)}
                className={resetPasswordPageStyles.input}
            />

            <label className={resetPasswordPageStyles.label}>이메일</label>
            <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className={resetPasswordPageStyles.input}
            />

            {message && (
                <p className={resetPasswordPageStyles.message}>{message}</p>
            )}

            <button
                type="button"
                onClick={handleRequestVerification}
                disabled={!canRequestVerification || isLoading}
                className={resetPasswordPageStyles.button}
            >
                {isLoading ? "발송 중..." : "비밀번호 찾기"}
            </button>
        </div>
    );
}