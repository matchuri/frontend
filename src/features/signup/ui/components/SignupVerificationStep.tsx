"use client";

import { Clock3 } from "lucide-react";

import type { EmailVerificationFeedback } from "@/features/emailVerification/domain/model/EmailVerificationFeedback";
import VerificationCodeInput from "@/features/emailVerification/ui/components/VerificationCodeInput";
import EmailVerificationHelpCard from "@/features/emailVerification/ui/components/EmailVerificationHelpCard";
import EmailVerificationResultModal from "@/features/emailVerification/ui/components/EmailVerificationResultModal";

import { authPageStyles } from "@/ui/styles/authPageStyles";
import { signupMultiStepStyles } from "@/ui/styles/signupMultiStepStyles";

interface SignupVerificationStepProps {
    readonly email: string;
    readonly code: string;
    readonly remainingSeconds: number | null;
    readonly resendSeconds: number | null;
    readonly message: string;
    readonly verificationFeedback: EmailVerificationFeedback | null;
    readonly isVerifying: boolean;
    readonly hasReachedSendLimit: boolean;
    readonly canConfirmVerificationEmail: boolean;
    readonly canResendVerificationEmail: boolean;
    readonly onCodeChange: (code: string) => void;
    readonly onConfirm: () => void;
    readonly onResend: () => void;
    readonly onCloseVerificationFeedback: () => void;
}

export default function SignupVerificationStep({
    email,
    code,
    remainingSeconds,
    resendSeconds,
    message,
    verificationFeedback,
    isVerifying,
    hasReachedSendLimit,
    canConfirmVerificationEmail,
    canResendVerificationEmail,
    onCodeChange,
    onConfirm,
    onResend,
    onCloseVerificationFeedback,
}: SignupVerificationStepProps) {
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

    return (
        <>
            <div className={authPageStyles.intro}>
                <h1 className={authPageStyles.title}>
                    인증번호를 입력해 주세요
                </h1>

                <p className={authPageStyles.description}>
                    <strong className={signupMultiStepStyles.email}>
                        {email}
                    </strong>
                    으로 발송된 6자리 인증번호를 입력해 주세요.
                </p>
            </div>

            <form
                className={authPageStyles.verificationSection}
                onSubmit={(event) => {
                    event.preventDefault();
                    onConfirm();
                }}
            >
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
                    onChange={onCodeChange}
                    disabled={isVerifying}
                />

                {message && (
                    <p className={`${authPageStyles.message} mt-3`}>
                        {message}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={!canConfirmVerificationEmail}
                    className={`${authPageStyles.primaryButton} mt-8`}
                >
                    {isVerifying ? "확인 중..." : "확인"}
                </button>

                <div className={authPageStyles.verificationHelp}>
                    <div className={authPageStyles.verificationResendRow}>
                        <span>인증번호를 받지 못했나요?</span>

                        <button
                            type="button"
                            onClick={onResend}
                            disabled={!canResendVerificationEmail}
                            className={authPageStyles.verificationResendButton}
                        >
                            {hasReachedSendLimit
                                ? "인증번호 재전송"
                                : resendSeconds !== null &&
                                    resendSeconds > 0
                                  ? `인증번호 재전송 (${formatResendSeconds(resendSeconds)})`
                                  : "인증번호 재전송"}
                        </button>
                    </div>
                </div>

                <EmailVerificationHelpCard variant="SIGNUP" />
            </form>

            <EmailVerificationResultModal
                feedback={verificationFeedback}
                onClose={onCloseVerificationFeedback}
            />
        </>
    );
}