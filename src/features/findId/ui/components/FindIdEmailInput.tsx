"use client";

import { findIdPageStyles } from "@/ui/styles/findIdPageStyles";

interface FindIdEmailInputProps {
    readonly email: string;
    readonly isLoading: boolean;
    readonly onEmailChange: (email: string) => void;
    readonly onSubmit: () => void;
}

export default function FindIdEmailInput({
    email,
    isLoading,
    onEmailChange,
    onSubmit,
}: FindIdEmailInputProps) {
    return (
        <div className={findIdPageStyles.form}>
            <p className={findIdPageStyles.description}>
                가입 시 사용한 이메일을 입력하세요
            </p>

            <label className={findIdPageStyles.label}>이메일</label>

            <input
                type="email"
                value={email}
                onChange={(event) => onEmailChange(event.target.value)}
                className={findIdPageStyles.input}
            />

            <button
                type="button"
                onClick={onSubmit}
                disabled={isLoading}
                className={findIdPageStyles.button}
            >
                {isLoading ? "발송 중..." : "아이디 찾기"}
            </button>
        </div>
    );
}