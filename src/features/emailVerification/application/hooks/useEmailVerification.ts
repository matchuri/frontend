"use client";

import { useEffect, useRef, useState } from "react";
import { emailVerificationApi } from "@/features/emailVerification/infrastructure/api/emailVerificationApi";
import type { EmailVerificationPurpose } from "@/features/emailVerification/domain/model/EmailVerificationPurpose";
import type { EmailVerificationStatus } from "@/features/emailVerification/domain/model/EmailVerificationStatus";

import { startTimer } from "@/features/emailVerification/application/utils/timer";

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
    const [emailVerificationToken, setEmailVerificationToken] =
        useState<string | null>(null);

    // 인증 코드 유효시간 (5분)
    const [remainingSeconds, setRemainingSeconds] =
        useState<number | null>(null);

    // 재발송 대기시간
    const [resendSeconds, setResendSeconds] =
        useState<number | null>(null);

    const [confirmAttemptCount, setConfirmAttemptCount] = useState(0);

    // 재발송 횟수 상태
    const [resendAttemptCount, setResendAttemptCount] = useState(0);

    // 실제 발송 성공 여부 상태
    const [hasSentVerificationEmail, setHasSentVerificationEmail] = useState(false);

    // 인증 코드 타이머 종료 함수 저장
    const verificationTimerRef = useRef<(() => void) | null>(null);

    // 재발송 타이머 종료 함수 저장
    const resendTimerRef = useRef<(() => void) | null>(null);

    // 인증코드 타이머
    useEffect(() => {
        if (remainingSeconds === null) return;
        if (remainingSeconds <= 0) return;

        // 기존 타이머 제거 (중복 방지)
        if (verificationTimerRef.current) {
            verificationTimerRef.current();
        }

        // 새로운 타이머 시작
        verificationTimerRef.current = startTimer(() => {
            setRemainingSeconds((prev) => {
                if (prev === null) return null;

                if (prev <= 1) {
                    if (verificationTimerRef.current) {
                        verificationTimerRef.current();
                        verificationTimerRef.current = null;
                    }

                    setStatus("EXPIRED");
                    setMessage("인증 코드가 만료되었습니다. 다시 발송해주세요.");

                    return 0;
                }

                return prev - 1;
            });
        });

        // cleanup
        return () => {
            if (verificationTimerRef.current) {
                verificationTimerRef.current();
            }
        };
    }, [remainingSeconds]);

    // 이메일 재발송 타이머
    useEffect(() => {
        if (resendSeconds === null) return;
        if (resendSeconds <= 0) return;

        if (resendTimerRef.current) {
            resendTimerRef.current();
        }

        resendTimerRef.current = startTimer(() => {
            setResendSeconds((prev) => {
                if (prev === null) return null;

                if (prev <= 1) {
                    if (resendTimerRef.current) {
                        resendTimerRef.current();
                        resendTimerRef.current = null;
                    }

                    return 0;
                }

                return prev - 1;
            });
        });

        return () => {
            if (resendTimerRef.current) {
                resendTimerRef.current();
            }
        };
    }, [resendSeconds]);

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

    // 인증 코드 발송
    const sendVerificationEmail = async () => {
        const trimmedEmail = validateEmail(email);
        if (!trimmedEmail) return;

        console.log("📧 전송할 이메일:", trimmedEmail);
        console.log("resendSeconds:", resendSeconds);

        // 재발송 대기 중이어도 버튼은 클릭 가능하지만 API 호출은 막고 alert 표시
        if (resendSeconds && resendSeconds > 0) {
            alert(`${resendSeconds}초 후 인증코드 재발송이 가능합니다.`);
            return;
        }

        // 인증 코드 발송/재발송 총 5회 제한
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

        try {
            const response = await emailVerificationApi.sendVerificationEmail({
                email: trimmedEmail,
                purpose,
            });

            console.log("📥 email API 응답:", response);

            if (!response.success) {
                setStatus("ERROR");
                setMessage(response.error?.message || "인증 코드 발송에 실패했습니다.");
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
            setCode(""); // 재발송 시 이전 코드 초기화
            setConfirmAttemptCount(0);

            // 타이머 시작
            setRemainingSeconds(VERIFICATION_EXPIRE_SECONDS);
            setResendSeconds(response.data.resendAvailableAfterSeconds);
        } catch (error) {
            console.error("📥 email API 요청 실패:", error);
            setStatus("ERROR");
            setMessage("인증 코드 발송에 실패했습니다.");
        }
    };

    // 인증 코드 확인
    const confirmVerificationEmail = async () => {
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

        try {
            const response = await emailVerificationApi.confirmVerificationEmail({
                email: trimmedEmail,
                purpose,
                code: trimmedCode,
            });

            if (!response.success || !response.data.verified) {
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
            setEmailVerificationToken(response.data.emailVerificationToken);

            // 타이머 종료
            if (verificationTimerRef.current) {
                verificationTimerRef.current();
                verificationTimerRef.current = null;
            }

            setRemainingSeconds(null);
        } catch {
            const nextCount = confirmAttemptCount + 1;
            setConfirmAttemptCount(nextCount);

            if (nextCount >= MAX_CONFIRM_ATTEMPTS) {
                setStatus("ERROR");
                setMessage("인증 시도 횟수를 초과했습니다. 인증 코드를 다시 발송해주세요.");
                return;
            }

            setStatus("ERROR");
            setMessage(`이메일 인증에 실패했습니다. (${nextCount}/${MAX_CONFIRM_ATTEMPTS})`);
        }
    };

    const handleEmailChange = (nextEmail: string) => {
        setEmail(nextEmail);
        setCode("");
        setStatus("IDLE");
        setMessage("");
        setEmailVerificationToken(null);
        setConfirmAttemptCount(0);
        setResendAttemptCount(0);
        setHasSentVerificationEmail(false);

        if (verificationTimerRef.current) {
            verificationTimerRef.current();
            verificationTimerRef.current = null;
        }

        if (resendTimerRef.current) {
            resendTimerRef.current();
            resendTimerRef.current = null;
        }

        // 타이머 초기화
        setRemainingSeconds(null);
        setResendSeconds(null);
    };

    const handleCodeChange = (nextCode: string) => {
        setCode(nextCode);
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
        handleEmailChange,
        handleCodeChange,
        sendVerificationEmail,
        confirmVerificationEmail,
    };
}