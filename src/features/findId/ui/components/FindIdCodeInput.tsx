"use client";

import { findIdPageStyles } from "@/ui/styles/findIdPageStyles";

interface FindIdCodeInputProps {
    readonly code: string;
    readonly isLoading: boolean;
    readonly onCodeChange: (code: string) => void;
    readonly onSubmit: () => void;
}

export default function FindIdCodeInput({
    code,
    isLoading,
    onCodeChange,
    onSubmit,
}: FindIdCodeInputProps) {
    return (
        <div className={findIdPageStyles.form}>
            <p className={findIdPageStyles.description}>
                이메일로 발송된 인증 코드를 입력하세요
            </p>

            <label className={findIdPageStyles.label}>인증 코드</label>

            <input
                type="text"
                value={code}
                onChange={(event) => onCodeChange(event.target.value)}
                className={findIdPageStyles.input}
            />

            <button
                type="button"
                onClick={onSubmit}
                disabled={isLoading}
                className={findIdPageStyles.button}
            >
                {isLoading ? "확인 중..." : "확인"}
            </button>
        </div>
    );
}