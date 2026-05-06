"use client";

import { resetPasswordPageStyles } from "@/ui/styles/resetPasswordPageStyles";

interface ResetPasswordCodeInputProps {
    readonly code: string;
    readonly remainingSeconds: number | null;
    readonly message: string | null;
    readonly isLoading: boolean;
    readonly canConfirmCode: boolean;
    readonly setCode: (code: string) => void;
    readonly handleConfirmCode: () => void;
}

export default function ResetPasswordCodeInput({
    code,
    remainingSeconds,
    message,
    isLoading,
    canConfirmCode,
    setCode,
    handleConfirmCode,
}: ResetPasswordCodeInputProps) {
    const formatSeconds = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remaining = seconds % 60;

        return `${minutes}:${remaining.toString().padStart(2, "0")}`;
    };

    return (
        <div className={resetPasswordPageStyles.form}>
            <p className={resetPasswordPageStyles.description}>
                이메일로 발송된 인증 코드를 입력하세요
            </p>

            <label className={`${resetPasswordPageStyles.label} mt-8`}>
                인증 코드
            </label>

            <input
                type="text"
                value={code}
                onChange={(event) => setCode(event.target.value)}
                className={resetPasswordPageStyles.input}
            />

            {remainingSeconds !== null && (
                <p className={resetPasswordPageStyles.timerText}>
                    인증 유효시간 {formatSeconds(remainingSeconds)}
                </p>
            )}

            {message && (
                <p className={resetPasswordPageStyles.message}>{message}</p>
            )}

            <button
                type="button"
                onClick={handleConfirmCode}
                disabled={!canConfirmCode || isLoading}
                className={resetPasswordPageStyles.button}
            >
                {isLoading ? "확인 중..." : "확인"}
            </button>
        </div>
    );
}