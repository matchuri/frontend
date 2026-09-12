"use client";

import { useState } from "react";
import { useSetAtom } from "jotai";
import { findIdAtom } from "@/features/findId/application/atoms/findIdAtom";
import { sendEmailVerification } from "@/features/emailVerification/application/usecase/sendEmailVerification";
import { confirmEmailVerification } from "@/features/emailVerification/application/usecase/confirmEmailVerification";
import { findIdByVerificationToken } from "@/features/findId/application/usecase/findIdByVerificationToken";

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
    const [isLoading, setIsLoading] = useState(false);
    const [isResending, setIsResending] = useState(false);

    const handleExpired = () => {
        setRemainingSeconds(0);
    };

    const handleResendAvailable = () => {
        setResendRemainingSeconds(0);
    };

    const handleCodeChange = (nextCode: string) => {
        setCode(nextCode);

        if (message?.startsWith("이메일 인증번호가 올바르지 않습니다.")) {
            setMessage(null);
        }
    };

    const handleSendCode = async () => {
        const trimmedEmail = email.trim();

        if (!trimmedEmail) return;

        setIsLoading(true);
        setMessage(null);
        setResendMessage(null);

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
        if (resendRemainingSeconds !== 0 ||
            isLoading ||
            isResending
        ) {
            return;
        }

        if (sendAttemptCount >= MAX_SEND_ATTEMPTS) {
            setResendMessage("인증번호 발송 가능 횟수를 초과했습니다.");
            return;
        }

        const trimmedEmail = email.trim();

        if (!trimmedEmail) return;

        setIsResending(true);
        setMessage(null);
        setResendMessage(null);

        const result = await sendEmailVerification({
            email: trimmedEmail,
            purpose: "FIND_LOGIN_ID",
        });

        setIsResending(false);

        if (!result.success) {
            setResendMessage(result.message);
            return;
        }

        setCode("");
        setConfirmAttemptCount(0);
        setSendAttemptCount((prev) => prev + 1);
        setRemainingSeconds(VERIFICATION_EXPIRES_IN_SECONDS);
        setResendRemainingSeconds(result.resendAvailableAfterSeconds);
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

        const confirmResult = await confirmEmailVerification({
            email: trimmedEmail,
            code: trimmedCode,
            purpose: "FIND_LOGIN_ID",
        });

        if (!confirmResult.success) {
            const nextConfirmAttemptCount = confirmAttemptCount + 1;

            setIsLoading(false);
            setConfirmAttemptCount(nextConfirmAttemptCount);

            if (nextConfirmAttemptCount >= MAX_CONFIRM_ATTEMPTS) {
                setMessage(
                    `이메일 인증번호가 올바르지 않습니다. 인증 시도 횟수를 초과했습니다. (${nextConfirmAttemptCount}/${MAX_CONFIRM_ATTEMPTS})`,
                );
                return;
            }

            setMessage(
                `이메일 인증번호가 올바르지 않습니다. 다시 시도하세요. (${nextConfirmAttemptCount}/${MAX_CONFIRM_ATTEMPTS})`,
            );
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
        isLoading,
        isResending,
        canConfirmCode:
            code.length === 6 &&
            remainingSeconds !== 0 &&
            confirmAttemptCount < MAX_CONFIRM_ATTEMPTS,
        canResendCode: resendRemainingSeconds === 0,
        setEmail,
        setCode: handleCodeChange,
        setRemainingSeconds,
        setResendRemainingSeconds,
        handleExpired,
        handleResendAvailable,
        handleSendCode,
        handleResendCode,
        handleFindId,
    };
}