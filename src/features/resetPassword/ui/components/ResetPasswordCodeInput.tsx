"use client";

import { resetPasswordPageStyles } from "@/ui/styles/resetPasswordPageStyles";

interface ResetPasswordCodeInputProps {
    readonly code: string;
    readonly canConfirmCode: boolean;
    readonly setCode: (code: string) => void;
    readonly handleConfirmCode: () => void;
}

export default function ResetPasswordCodeInput({
    code,
    canConfirmCode,
    setCode,
    handleConfirmCode,
}: ResetPasswordCodeInputProps) {
    return (
        <div className={resetPasswordPageStyles.form}>
            <p className={resetPasswordPageStyles.description}>
                이메일로 발송된 인증 코드를 입력하세요
            </p>

            <label className={resetPasswordPageStyles.label}>인증 코드</label>
            <input
                type="text"
                value={code}
                onChange={(event) => setCode(event.target.value)}
                className={resetPasswordPageStyles.input}
            />

            <p className={resetPasswordPageStyles.timerText}>
                인증 유효시간 5:00
            </p>

            <button
                type="button"
                onClick={handleConfirmCode}
                disabled={!canConfirmCode}
                className={resetPasswordPageStyles.button}
            >
                확인
            </button>
        </div>
    );
}