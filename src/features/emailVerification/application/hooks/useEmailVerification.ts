"use client";

import { useState } from "react";
import { emailVerificationApi } from "@/features/emailVerification/infrastructure/api/emailVerificationApi";
import type { EmailVerificationPurpose } from "@/features/emailVerification/domain/model/EmailVerificationPurpose";

type EmailVerificationStatus =
    | "IDLE"
    | "SENDING"
    | "SENT"
    | "VERIFYING"
    | "VERIFIED"
    | "ERROR";

interface UseEmailVerificationParams {
    purpose: EmailVerificationPurpose;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VERIFICATION_CODE_REGEX = /^\d{6}$/;

export function useEmailVerification({
    purpose,
}: UseEmailVerificationParams) {
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [status, setStatus] = useState<EmailVerificationStatus>("IDLE");
    const [message, setMessage] = useState("");
    const [emailVerificationToken, setEmailVerificationToken] =
        useState<string | null>(null);
    const [resendAvailableAfterSeconds, setResendAvailableAfterSeconds] =
        useState<number | null>(null);

    const validateEmail = (nextEmail: string) => {
        const trimmedEmail = nextEmail.trim();

        if (!trimmedEmail) {
            setStatus("ERROR");
            setMessage("이메일을 입력해주세요.");
            return null;
        }

        if (!EMAIL_REGEX.test(trimmedEmail)) {
            setStatus("ERROR");
            setMessage("올바른 이메일 형식을 입력하세요.");
            return null;
        }

        return trimmedEmail;
    };

    const sendVerificationEmail = async () => {
        const trimmedEmail = validateEmail(email);

        if (!trimmedEmail) return;

        setStatus("SENDING");
        setMessage("인증 코드를 발송하는 중입니다.");

        try {
            const response = await emailVerificationApi.sendVerificationEmail({
                email: trimmedEmail,
                purpose,
            });

            if (!response.success) {
                setStatus("ERROR");
                setMessage(response.error?.message || "인증 코드 발송에 실패했습니다.");
                return;
            }

            setStatus("SENT");
            setMessage("인증 코드가 발송되었습니다.");
            setResendAvailableAfterSeconds(
                response.data.resendAvailableAfterSeconds,
            );
        } catch {
            setStatus("ERROR");
            setMessage("인증 코드 발송에 실패했습니다.");
        }
    };

    const confirmVerificationEmail = async () => {
        const trimmedEmail = validateEmail(email);
        const trimmedCode = code.trim();

        if (!trimmedEmail) return;

        if (!VERIFICATION_CODE_REGEX.test(trimmedCode)) {
            setStatus("ERROR");
            setMessage("인증 코드는 6자리 숫자여야 합니다.");
            return;
        }

        setStatus("VERIFYING");
        setMessage("인증 코드를 확인하는 중입니다.");

        try {
            const response = await emailVerificationApi.confirmVerificationEmail({
                email: trimmedEmail,
                purpose,
                code: trimmedCode,
            });

            if (!response.success || !response.data.verified) {
                setStatus("ERROR");
                setMessage(response.error?.message || "이메일 인증에 실패했습니다.");
                return;
            }

            setStatus("VERIFIED");
            setMessage("이메일 인증이 완료되었습니다.");
            setEmailVerificationToken(response.data.emailVerificationToken);
        } catch {
            setStatus("ERROR");
            setMessage("이메일 인증에 실패했습니다.");
        }
    };

    const handleEmailChange = (nextEmail: string) => {
        setEmail(nextEmail);
        setCode("");
        setStatus("IDLE");
        setMessage("");
        setEmailVerificationToken(null);
        setResendAvailableAfterSeconds(null);
    };

    const handleCodeChange = (nextCode: string) => {
        setCode(nextCode);
    };

    const canSendVerificationEmail =
        email.trim().length > 0 && status !== "SENDING";

    const canConfirmVerificationEmail =
        code.trim().length === 6 && status !== "VERIFYING";

    const isVerified = status === "VERIFIED" && !!emailVerificationToken;

    return {
        email,
        code,
        status,
        message,
        emailVerificationToken,
        resendAvailableAfterSeconds,
        canSendVerificationEmail,
        canConfirmVerificationEmail,
        isVerified,
        handleEmailChange,
        handleCodeChange,
        sendVerificationEmail,
        confirmVerificationEmail,
    };
}