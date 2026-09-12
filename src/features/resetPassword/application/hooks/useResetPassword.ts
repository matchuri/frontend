"use client";

import { useState } from "react";
import { useSetAtom } from "jotai";
import { resetPasswordAtom } from "@/features/resetPassword/application/atoms/resetPasswordAtom";
import { requestPasswordVerification } from "@/features/resetPassword/application/usecase/requestPasswordVerification";
import { confirmPasswordVerification } from "@/features/resetPassword/application/usecase/confirmPasswordVerification";
import { resetPassword } from "@/features/resetPassword/application/usecase/resetPassword";
import { validateResetPassword } from "@/features/resetPassword/domain/validator/validateResetPassword";

const MAX_SEND_ATTEMPTS = 5;
const MAX_CONFIRM_ATTEMPTS = 5;
const VERIFICATION_EXPIRES_IN_SECONDS = 300;

export function useResetPassword() {
    const setResetPasswordState = useSetAtom(resetPasswordAtom);

    const [loginId, setLoginId] = useState("");
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

    const [remainingSeconds, setRemainingSeconds] = useState<number | null>(null);
    const [resendRemainingSeconds, setResendRemainingSeconds] = useState<number | null>(null);
    const [sendAttemptCount, setSendAttemptCount] = useState(0);
    const [confirmAttemptCount, setConfirmAttemptCount] = useState(0);
    const [message, setMessage] = useState<string | null>(null);
    const [resendMessage, setResendMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isResending, setIsResending] = useState(false);

    const passwordValidationResult = validateResetPassword(newPassword);

    const passwordMessage =
        passwordValidationResult.success ? "" : passwordValidationResult.message;

    const isPasswordValid = passwordValidationResult.success;

    const isPasswordConfirmMatched =
        !!newPasswordConfirm && newPassword === newPasswordConfirm;

    const handleExpired = () => {
        setMessage("인증 시간이 만료되었습니다. 다시 시도해주세요.");
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

    const handleRequestVerification = async () => {
        setIsLoading(true);
        setMessage(null);
        setResendMessage(null);

        const result = await requestPasswordVerification({
            loginId,
            email,
        });

        setIsLoading(false);

        if (!result.success) {
            setMessage(result.message);
            return;
        }

        setSendAttemptCount(1);
        setConfirmAttemptCount(0);
        setRemainingSeconds(VERIFICATION_EXPIRES_IN_SECONDS);
        setResendRemainingSeconds(result.resendAvailableAfterSeconds);

        setResetPasswordState({
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

        setIsResending(true);
        setMessage(null);
        setResendMessage(null);

        const result = await requestPasswordVerification({
            loginId,
            email,
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

    const handleConfirmCode = async () => {
        if (remainingSeconds === 0) {
            setMessage("인증 시간이 만료되었습니다. 다시 시도해주세요.");
            return;
        }

        if (confirmAttemptCount >= MAX_CONFIRM_ATTEMPTS ||
            isResending
        ) {
            return;
        }

        setIsLoading(true);
        setMessage(null);

        const result = await confirmPasswordVerification({
            loginId,
            email,
            code,
        });

        setIsLoading(false);

        if (!result.success) {
            const nextConfirmAttemptCount = confirmAttemptCount + 1;

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

        setResetPasswordState({
            status: "PASSWORD_INPUT",
        });
    };

    const handleResetPassword = async () => {
        if (!isPasswordValid) {
            setMessage(passwordMessage);
            return;
        }

        if (!isPasswordConfirmMatched) {
            setMessage("비밀번호가 일치하지 않습니다.");
            return;
        }

        setIsLoading(true);
        setMessage(null);

        const result = await resetPassword({
            newPassword,
            newPasswordConfirm,
        });

        setIsLoading(false);

        if (!result.success) {
            setMessage(result.message);
            return;
        }

        setResetPasswordState({
            status: "COMPLETE",
        });
    };

    return {
        loginId,
        email,
        code,
        newPassword,
        newPasswordConfirm,
        remainingSeconds,
        resendRemainingSeconds,
        sendAttemptCount,
        confirmAttemptCount,
        message,
        resendMessage,
        passwordMessage,
        isPasswordValid,
        isLoading,
        isResending,
        canRequestVerification: !!loginId.trim() && !!email.trim(),
        canConfirmCode:
            code.length === 6 &&
            remainingSeconds !== 0 &&
            confirmAttemptCount < MAX_CONFIRM_ATTEMPTS,
        canResendCode: resendRemainingSeconds === 0,
        canResetPassword: isPasswordValid && isPasswordConfirmMatched,
        setLoginId,
        setEmail,
        setCode: handleCodeChange,
        setNewPassword,
        setNewPasswordConfirm,
        setRemainingSeconds,
        setResendRemainingSeconds,
        handleExpired,
        handleResendAvailable,
        handleRequestVerification,
        handleResendCode,
        handleConfirmCode,
        handleResetPassword,
    };
}