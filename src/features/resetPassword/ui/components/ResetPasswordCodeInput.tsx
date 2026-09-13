"use client";

import { Clock3 } from "lucide-react";

import VerificationCodeInput from "@/features/emailVerification/ui/components/VerificationCodeInput";
import EmailVerificationHelpCard from "@/features/emailVerification/ui/components/EmailVerificationHelpCard";
import { authPageStyles } from "@/ui/styles/authPageStyles";

interface ResetPasswordCodeInputProps {
    readonly code: string;
    readonly remainingSeconds: number | null;
    readonly resendRemainingSeconds: number | null;
    readonly message: string | null;
    readonly resendMessage: string | null;
    readonly isLoading: boolean;
    readonly isResending: boolean;
    readonly canConfirmCode: boolean;
    readonly canResendCode: boolean;
    readonly setCode: (code: string) => void;
    readonly handleConfirmCode: () => void;
    readonly handleResendCode: () => void;
}

export default function ResetPasswordCodeInput({
    code,
    remainingSeconds,
    resendRemainingSeconds,
    message,
    resendMessage,
    isLoading,
    isResending,
    canConfirmCode,
    canResendCode,
    setCode,
    handleConfirmCode,
    handleResendCode,
}: ResetPasswordCodeInputProps) {
    const formatSeconds = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remaining = seconds % 60;

        return `${minutes}:${remaining.toString().padStart(2, "0")}`;
    };

    const formatResendSeconds = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remaining = seconds % 60;

        return `${minutes.toString().padStart(2, "0")}:${remaining.toString().padStart(2, "0")}`;
    };

    const isCodeError = message?.startsWith("이메일 인증번호가 올바르지 않습니다.") ?? false;

    return (
        <div>
            <div className={authPageStyles.intro}>
                <h1 className={authPageStyles.title}>비밀번호 찾기</h1>

                <p className={authPageStyles.description}>
                    이메일로 발송된 6자리 인증번호를 입력해 주세요.
                </p>
            </div>

            <div className={authPageStyles.verificationSection}>
                {remainingSeconds !== null && (
                    <div className={authPageStyles.codeInfo}>
                        <Clock3 size={16} />

                        <span>인증 유효시간</span>

                        <span className={authPageStyles.timerText}>
                            {formatSeconds(remainingSeconds)}
                        </span>
                    </div>
                )}

                <VerificationCodeInput
                    value={code}
                    onChange={setCode}
                    disabled={isLoading}
                    isError={isCodeError}
                />

                {message && (
                    <p className={`${authPageStyles.message} mt-3`}>
                        {message}
                    </p>
                )}

                <button
                    type="button"
                    onClick={handleConfirmCode}
                    disabled={!canConfirmCode || isLoading}
                    className={`${authPageStyles.primaryButton} mt-8`}
                >
                    {isLoading ? "확인 중..." : "확인"}
                </button>

                <div className={authPageStyles.verificationHelp}>
                    <div className={authPageStyles.verificationResendRow}>
                        <span>인증번호를 받지 못했나요?</span>

                        <button
                            type="button"
                            onClick={handleResendCode}
                            disabled={!canResendCode || isResending}
                            className={authPageStyles.verificationResendButton}
                        >
                            {isResending
                                ? "재전송 중..."
                                : resendRemainingSeconds !== null &&
                                    resendRemainingSeconds > 0
                                  ? `인증번호 재전송 (${formatResendSeconds(resendRemainingSeconds)})`
                                  : "인증번호 재전송"}
                        </button>
                    </div>

                    {resendMessage && (
                        <p className={authPageStyles.verificationResendMessage}>
                            {resendMessage}
                        </p>
                    )}
                </div>

                <EmailVerificationHelpCard />
            </div>
        </div>
    );
}