"use client";

import { resetPasswordPageStyles } from "@/ui/styles/resetPasswordPageStyles";

interface ResetPasswordAccountInputProps {
    readonly loginId: string;
    readonly email: string;
    readonly canRequestVerification: boolean;
    readonly setLoginId: (loginId: string) => void;
    readonly setEmail: (email: string) => void;
    readonly handleRequestVerification: () => void;
}

export default function ResetPasswordAccountInput({
    loginId,
    email,
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

            <label className={resetPasswordPageStyles.label}>아이디</label>
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

            <button
                type="button"
                onClick={handleRequestVerification}
                disabled={!canRequestVerification}
                className={resetPasswordPageStyles.button}
            >
                비밀번호 찾기
            </button>
        </div>
    );
}