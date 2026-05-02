"use client";

import { useCallback, useState } from "react";

import type { EmailVerificationPurpose } from "@/features/emailVerification/domain/model/EmailVerificationPurpose";
import type { EmailVerificationStatus } from "@/features/emailVerification/domain/model/EmailVerificationStatus";
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

    // 실제 발송 성공 여부 상태
    const [hasSentVerificationEmail, setHasSentVerificationEmail] = useState(false);

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
        setHasSentVerificationEmail(false);
    };

    const handleCodeChange = (nextCode: string) => {
        setCode(nextCode);
    };

    const handleExpired = useCallback(() => {
        setStatus("EXPIRED");
        setMessage("인증 코드가 만료되었습니다. 다시 발송해주세요.");
    }, []);

    const sendVerificationEmail = async () => {
        const trimmedEmail = validateEmail(email);
        if (!trimmedEmail) return;

        if (resendSeconds && resendSeconds > 0) {
            alert(`${resendSeconds}초 후 인증코드 재발송이 가능합니다.`);
            return;
        }

        if (resendAttemptCount >= MAX_RESEND_ATTEMPTS) {
            setStatus("ERROR");
            setMessage("인증 코드 발송 횟수를 초과했습니다.");
            return;
        }

        setStatus("SENDING");
        setMessage(
            hasSentVerificationEmail
                ? "인증 코드를 재발송하는 중입니다."
                : "인증 코드를 발송하는 중입니다.",
        );

        const result = await sendEmailVerification({
            email: trimmedEmail,
            purpose,
        });

        if (!result.success) {
            setStatus("ERROR");
            setMessage(result.message);
            return;
        }

        setStatus("SENT");
        setMessage(
            hasSentVerificationEmail
                ? "인증 코드가 재발송되었습니다."
                : "인증 코드가 발송되었습니다.",
        );

        setHasSentVerificationEmail(true);
        setResendAttemptCount((prev) => prev + 1);

        setEmailVerificationToken(null);
        setCode("");
        setConfirmAttemptCount(0);

        setRemainingSeconds(VERIFICATION_EXPIRE_SECONDS);
        setResendSeconds(result.resendAvailableAfterSeconds);
    };

    const confirmVerificationEmail = async (stopVerificationTimer: () => void) => {
        const trimmedEmail = validateEmail(email);
        const trimmedCode = code.trim();

        if (!trimmedEmail) return;

        if (remainingSeconds === 0 || status === "EXPIRED") {
            setStatus("EXPIRED");
            setMessage("인증 코드가 만료되었습니다. 다시 발송해주세요.");
            return;
        }

        if (confirmAttemptCount >= MAX_CONFIRM_ATTEMPTS) {
            setStatus("ERROR");
            setMessage("인증 시도 횟수를 초과했습니다. 인증 코드를 다시 발송해주세요.");
            return;
        }

        if (!VERIFICATION_CODE_REGEX.test(trimmedCode)) {
            setStatus("ERROR");
            setMessage("인증 코드는 6자리 숫자여야 합니다.");
            return;
        }

        setStatus("VERIFYING");
        setMessage("인증 코드를 확인하는 중입니다.");

        const result = await confirmEmailVerification({
            email: trimmedEmail,
            purpose,
            code: trimmedCode,
        });

        if (!result.success) {
            const nextCount = confirmAttemptCount + 1;
            setConfirmAttemptCount(nextCount);

            if (nextCount >= MAX_CONFIRM_ATTEMPTS) {
                setStatus("ERROR");
                setMessage("인증 시도 횟수를 초과했습니다. 인증 코드를 다시 발송해주세요.");
                return;
            }

            setStatus("ERROR");
            setMessage(`이메일 인증에 실패했습니다. (${nextCount}/${MAX_CONFIRM_ATTEMPTS})`);
            return;
        }

        setStatus("VERIFIED");
        setMessage("이메일 인증이 완료되었습니다.");
        setEmailVerificationToken(result.emailVerificationToken);

        stopVerificationTimer();
        setRemainingSeconds(null);
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
        hasSentVerificationEmail,
        canSendVerificationEmail,
        canResendVerificationEmail,
        canConfirmVerificationEmail,
        isVerified,
        setRemainingSeconds,
        setResendSeconds,
        handleExpired,
        handleEmailChange,
        handleCodeChange,
        sendVerificationEmail,
        confirmVerificationEmail,
    };
}