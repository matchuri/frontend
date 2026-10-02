"use client";

import { useCallback, useState } from "react";

import type { EmailVerificationPurpose } from "@/features/emailVerification/domain/model/EmailVerificationPurpose";
import type { EmailVerificationStatus } from "@/features/emailVerification/domain/model/EmailVerificationStatus";
import type { EmailVerificationFeedback } from "@/features/emailVerification/domain/model/EmailVerificationFeedback";
import { sendEmailVerification } from "@/features/emailVerification/application/usecase/sendEmailVerification";
import { confirmEmailVerification } from "@/features/emailVerification/application/usecase/confirmEmailVerification";

interface UseEmailVerificationParams {
    purpose: EmailVerificationPurpose;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 이메일 형식 검증
const VERIFICATION_CODE_REGEX = /^\d{6}$/; // 인증 코드 6자리

const VERIFICATION_EXPIRE_SECONDS = 300; // 인증코드 유효시간: 5분
const MAX_CONFIRM_ATTEMPTS = 5; // 이메일 인증 횟수 5회 제한
const MAX_RESEND_ATTEMPTS = 5; // 재발송 횟수 상태

export function useEmailVerification({
    purpose,
}: UseEmailVerificationParams) {
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [status, setStatus] = useState<EmailVerificationStatus>("IDLE");
    const [message, setMessage] = useState("");

    // 인증 성공 시 받은 토큰
    const [emailVerificationToken, setEmailVerificationToken] = useState<string | null>(null);

    // 인증 코드 유효시간 (5분)
    const [remainingSeconds, setRemainingSeconds] = useState<number | null>(null);

    // 재발송 대기시간
    const [resendSeconds, setResendSeconds] = useState<number | null>(null);

    const [confirmAttemptCount, setConfirmAttemptCount] = useState(0);

    // 재발송 횟수 상태
    const [resendAttemptCount, setResendAttemptCount] = useState(0);

    const [verificationFeedback, setVerificationFeedback] =
        useState<EmailVerificationFeedback | null>(null);

    // 실제 발송 성공 여부 상태
    const [hasSentVerificationEmail, setHasSentVerificationEmail] = useState(false);

    const hasReachedSendLimit = resendAttemptCount >= MAX_RESEND_ATTEMPTS;

    // 이메일 검증
    const validateEmail = (nextEmail: string): string | null => {
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

    const handleEmailChange = (nextEmail: string) => {
        setEmail(nextEmail);
        setCode("");
        setStatus("IDLE");
        setMessage("");
        setEmailVerificationToken(null);
        setRemainingSeconds(null);
        setResendSeconds(null);
        setConfirmAttemptCount(0);
        setResendAttemptCount(0);
        setVerificationFeedback(null);
        setHasSentVerificationEmail(false);
    };

    const handleCodeChange = (nextCode: string) => {
        setCode(nextCode);
    };

    const closeVerificationFeedback = () => {
        setVerificationFeedback(null);
    };

    const handleExpired = useCallback(() => {
        setStatus("EXPIRED");
        setMessage("인증 코드가 만료되었습니다. 다시 발송해주세요.");
    }, []);

    const sendVerificationEmail = async () => {
        const trimmedEmail = validateEmail(email);
        if (!trimmedEmail) return false;

        if (resendSeconds && resendSeconds > 0) {
            alert(`${resendSeconds}초 후 인증코드 재발송이 가능합니다.`);
            return false;
        }

        if (resendAttemptCount >= MAX_RESEND_ATTEMPTS) {
            return false;
        }

        const isResend = hasSentVerificationEmail;

        setStatus("SENDING");
        setMessage("");
        setVerificationFeedback(null);

        const result = await sendEmailVerification({
            email: trimmedEmail,
            purpose,
        });

        if (!result.success) {
            if (purpose === "SIGNUP" && result.status === 409) {
                setStatus("ERROR");
                setMessage("");
                alert("이미 가입중인 메일입니다.");
                return false;
            }

            setStatus("ERROR");
            setMessage(result.message);
            return false;
        }

        const nextResendAttemptCount = resendAttemptCount + 1;

        setStatus("SENT");
        setMessage("");

        setHasSentVerificationEmail(true);
        setResendAttemptCount(nextResendAttemptCount);

        setEmailVerificationToken(null);
        setCode("");
        setConfirmAttemptCount(0);

        setRemainingSeconds(VERIFICATION_EXPIRE_SECONDS);
        setResendSeconds(result.resendAvailableAfterSeconds);

        if (isResend) {
            setVerificationFeedback({
                type: "RESEND_SUCCESS",
                remainingCount: Math.max(
                    MAX_RESEND_ATTEMPTS - nextResendAttemptCount,
                    0,
                ),
            });
        }

        return true;
    };

    const confirmVerificationEmail = async (stopVerificationTimer: () => void) => {
        const trimmedEmail = validateEmail(email);
        const trimmedCode = code.trim();

        if (!trimmedEmail) return null;

        if (remainingSeconds === 0 || status === "EXPIRED") {
            setStatus("EXPIRED");
            setMessage("인증 코드가 만료되었습니다. 다시 발송해주세요.");
            return null;
        }

        if (confirmAttemptCount >= MAX_CONFIRM_ATTEMPTS) {
            return null;
        }

        if (!VERIFICATION_CODE_REGEX.test(trimmedCode)) {
            setStatus("ERROR");
            setMessage("인증 코드는 6자리 숫자여야 합니다.");
            return null;
        }

        setStatus("VERIFYING");
        setMessage("");
        setVerificationFeedback(null);

        const result = await confirmEmailVerification({
            email: trimmedEmail,
            purpose,
            code: trimmedCode,
        });

        if (!result.success) {
            const nextCount = confirmAttemptCount + 1;

            setConfirmAttemptCount(nextCount);
            setStatus("ERROR");
            setMessage("");
            setVerificationFeedback({
                type: "CONFIRM_FAILURE",
                remainingCount: Math.max(
                    MAX_CONFIRM_ATTEMPTS - nextCount,
                    0,
                ),
            });
            return null;
        }

        setStatus("VERIFIED");
        setMessage("");
        setEmailVerificationToken(result.emailVerificationToken);

        stopVerificationTimer();
        setRemainingSeconds(null);

        return result.emailVerificationToken;
    };

    // 버튼 활성화 조건
    const canSendVerificationEmail =
        email.trim().length > 0 &&
        status !== "SENDING" &&
        status !== "VERIFIED" &&
        !hasSentVerificationEmail &&
        resendAttemptCount < MAX_RESEND_ATTEMPTS;

    const canResendVerificationEmail =
        hasSentVerificationEmail &&
        status !== "SENDING" &&
        status !== "VERIFIED" &&
        resendAttemptCount < MAX_RESEND_ATTEMPTS;

    const canConfirmVerificationEmail =
        code.trim().length === 6 &&
        status !== "VERIFYING" &&
        status !== "VERIFIED" &&
        status !== "EXPIRED" &&
        remainingSeconds !== 0 &&
        confirmAttemptCount < MAX_CONFIRM_ATTEMPTS;

    const isVerified = status === "VERIFIED" && !!emailVerificationToken;

    return {
        email,
        code,
        status,
        message,
        emailVerificationToken,
        remainingSeconds,
        resendSeconds,
        confirmAttemptCount,
        maxConfirmAttempts: MAX_CONFIRM_ATTEMPTS,
        resendAttemptCount,
        maxResendAttempts: MAX_RESEND_ATTEMPTS,
        verificationFeedback,
        hasSentVerificationEmail,
        hasReachedSendLimit,
        canSendVerificationEmail,
        canResendVerificationEmail,
        canConfirmVerificationEmail,
        isVerified,
        setRemainingSeconds,
        setResendSeconds,
        handleExpired,
        handleEmailChange,
        handleCodeChange,
        closeVerificationFeedback,
        sendVerificationEmail,
        confirmVerificationEmail,
    };
}