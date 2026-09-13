"use client";

import { useState } from "react";
import { useSetAtom } from "jotai";
import { findIdAtom } from "@/features/findId/application/atoms/findIdAtom";
import { sendEmailVerification } from "@/features/emailVerification/application/usecase/sendEmailVerification";
import { confirmEmailVerification } from "@/features/emailVerification/application/usecase/confirmEmailVerification";
import { findIdByVerificationToken } from "@/features/findId/application/usecase/findIdByVerificationToken";
import type { EmailVerificationFeedback } from "@/features/emailVerification/domain/model/EmailVerificationFeedback";

const MAX_SEND_ATTEMPTS = 5;
const MAX_CONFIRM_ATTEMPTS = 5;
const VERIFICATION_EXPIRES_IN_SECONDS = 300;

export function useFindId() {
    const setFindIdState = useSetAtom(findIdAtom);

    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [remainingSeconds, setRemainingSeconds] = useState<number | null>(null);
    const [resendRemainingSeconds, setResendRemainingSeconds] = useState<number | null>(null);
    const [sendAttemptCount, setSendAttemptCount] = useState(0);
    const [confirmAttemptCount, setConfirmAttemptCount] = useState(0);
    const [message, setMessage] = useState<string | null>(null);
    const [resendMessage, setResendMessage] = useState<string | null>(null);
    const [verificationFeedback, setVerificationFeedback] =
        useState<EmailVerificationFeedback | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isResending, setIsResending] = useState(false);

    const hasReachedSendLimit = sendAttemptCount >= MAX_SEND_ATTEMPTS;

    const handleExpired = () => {
        setRemainingSeconds(0);
    };

    const handleResendAvailable = () => {
        setResendRemainingSeconds(0);
    };

    const handleCodeChange = (nextCode: string) => {
        setCode(nextCode);
    };

    const closeVerificationFeedback = () => {
        setVerificationFeedback(null);
    };

    const handleSendCode = async () => {
        const trimmedEmail = email.trim();

        if (!trimmedEmail) return;

        setIsLoading(true);
        setMessage(null);
        setResendMessage(null);
        setVerificationFeedback(null);

        const result = await sendEmailVerification({
            email: trimmedEmail,
            purpose: "FIND_LOGIN_ID",
        });

        setIsLoading(false);

        if (!result.success) {
            setFindIdState({
                status: "ERROR",
                message: result.message,
            });
            return;
        }

        setSendAttemptCount(1);
        setConfirmAttemptCount(0);
        setRemainingSeconds(VERIFICATION_EXPIRES_IN_SECONDS);
        setResendRemainingSeconds(result.resendAvailableAfterSeconds);

        setFindIdState({
            status: "CODE_INPUT",
        });
    };

    const handleResendCode = async () => {
        if (
            isLoading ||
            isResending
        ) {
            return;
        }

        if (sendAttemptCount >= MAX_SEND_ATTEMPTS) {
            return;
        }

        if (resendRemainingSeconds !== 0) {
            return;
        }

        const trimmedEmail = email.trim();

        if (!trimmedEmail) return;

        setIsResending(true);
        setMessage(null);
        setResendMessage(null);
        setVerificationFeedback(null);

        const result = await sendEmailVerification({
            email: trimmedEmail,
            purpose: "FIND_LOGIN_ID",
        });

        setIsResending(false);

        if (!result.success) {
            setResendMessage(result.message);
            return;
        }

        const nextSendAttemptCount = sendAttemptCount + 1;

        setCode("");
        setConfirmAttemptCount(0);
        setSendAttemptCount(nextSendAttemptCount);
        setRemainingSeconds(VERIFICATION_EXPIRES_IN_SECONDS);
        setResendRemainingSeconds(3);
        setVerificationFeedback({
            type: "RESEND_SUCCESS",
            remainingCount: Math.max(
                MAX_SEND_ATTEMPTS - nextSendAttemptCount,
                0,
            ),
        });
    };

    const handleFindId = async () => {
        const trimmedEmail = email.trim();
        const trimmedCode = code.trim();

        if (!trimmedEmail || !trimmedCode) return;

        if (remainingSeconds === 0 ||
            confirmAttemptCount >= MAX_CONFIRM_ATTEMPTS ||
            isResending
        ) {
            return;
        }

        setIsLoading(true);
        setMessage(null);
        setVerificationFeedback(null);

        const confirmResult = await confirmEmailVerification({
            email: trimmedEmail,
            code: trimmedCode,
            purpose: "FIND_LOGIN_ID",
        });

        if (!confirmResult.success) {
            const nextConfirmAttemptCount = confirmAttemptCount + 1;

            setIsLoading(false);
            setConfirmAttemptCount(nextConfirmAttemptCount);
            setVerificationFeedback({
                type: "CONFIRM_FAILURE",
                remainingCount: Math.max(
                    MAX_CONFIRM_ATTEMPTS - nextConfirmAttemptCount,
                    0,
                ),
            });
            return;
        }

        setRemainingSeconds(null);

        const result = await findIdByVerificationToken({
            emailVerificationToken: confirmResult.emailVerificationToken,
        });

        setIsLoading(false);
        setFindIdState(result);
    };

    return {
        email,
        code,
        remainingSeconds,
        resendRemainingSeconds,
        sendAttemptCount,
        confirmAttemptCount,
        message,
        resendMessage,
        verificationFeedback,
        hasReachedSendLimit,
        isLoading,
        isResending,
        canConfirmCode:
            code.length === 6 &&
            remainingSeconds !== 0 &&
            confirmAttemptCount < MAX_CONFIRM_ATTEMPTS,
        canResendCode:
            !hasReachedSendLimit &&
            resendRemainingSeconds === 0,
        setEmail,
        setCode: handleCodeChange,
        setRemainingSeconds,
        setResendRemainingSeconds,
        handleExpired,
        handleResendAvailable,
        closeVerificationFeedback,
        handleSendCode,
        handleResendCode,
        handleFindId,
    };
}