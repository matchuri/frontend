"use client";

import { Check, CircleAlert } from "lucide-react";

import type { EmailVerificationFeedback } from "@/features/emailVerification/domain/model/EmailVerificationFeedback";
import { authPageStyles } from "@/ui/styles/authPageStyles";

interface EmailVerificationResultModalProps {
    readonly feedback: EmailVerificationFeedback | null;
    readonly onClose: () => void;
}

export default function EmailVerificationResultModal({
    feedback,
    onClose,
}: EmailVerificationResultModalProps) {
    if (!feedback) {
        return null;
    }

    const isError = feedback.type === "CONFIRM_FAILURE";

    const title =
        feedback.type === "CONFIRM_FAILURE"
            ? "인증번호가 일치하지 않습니다."
            : "인증번호를 재전송했습니다.";

    return (
        <div className={authPageStyles.verificationResultModalOverlay}>
            <div
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="email-verification-result-title"
                aria-describedby="email-verification-result-description"
                className={authPageStyles.verificationResultModal}
            >
                <div
                    className={
                        isError
                            ? authPageStyles.verificationResultErrorIcon
                            : authPageStyles.verificationResultSuccessIcon
                    }
                >
                    {isError ? (
                        <CircleAlert
                            size={48}
                            strokeWidth={2.2}
                            aria-hidden="true"
                        />
                    ) : (
                        <Check
                            size={36}
                            strokeWidth={2.8}
                            aria-hidden="true"
                        />
                    )}
                </div>

                <h2
                    id="email-verification-result-title"
                    className={authPageStyles.verificationResultTitle}
                >
                    {title}
                </h2>

                <p
                    id="email-verification-result-description"
                    className={authPageStyles.verificationResultDescription}
                >
                    {feedback.type === "CONFIRM_FAILURE"
                        ? "인증 시도는 "
                        : "인증번호 발송은 "}

                    <strong className={authPageStyles.verificationResultCount}>
                        {feedback.remainingCount}회
                    </strong>

                    {" 남았습니다."}
                </p>

                <button
                    type="button"
                    onClick={onClose}
                    className={`${authPageStyles.primaryButton} ${authPageStyles.verificationResultButton}`}
                >
                    확인
                </button>
            </div>
        </div>
    );
}