"use client";

import { useAtomValue } from "jotai";
import { findIdAtom } from "@/features/findId/application/atoms/findIdAtom";
import { useFindId } from "@/features/findId/application/hooks/useFindId";
import { useVerificationExpireTimer } from "@/features/emailVerification/application/hooks/useVerificationExpireTimer";
import FindIdEmailInput from "@/features/findId/ui/components/FindIdEmailInput";
import FindIdCodeInput from "@/features/findId/ui/components/FindIdCodeInput";
import FindIdResult from "@/features/findId/ui/components/FindIdResult";

export default function FindIdForm() {
    const state = useAtomValue(findIdAtom);

    const {
        email,
        code,
        remainingSeconds,
        resendRemainingSeconds,
        message,
        resendMessage,
        verificationFeedback,
        hasReachedSendLimit,
        isLoading,
        isResending,
        canConfirmCode,
        canResendCode,
        setEmail,
        setCode,
        setRemainingSeconds,
        setResendRemainingSeconds,
        handleExpired,
        handleResendAvailable,
        closeVerificationFeedback,
        handleSendCode,
        handleResendCode,
        handleFindId,
    } = useFindId();

    useVerificationExpireTimer({
        remainingSeconds,
        setRemainingSeconds,
        onExpired: handleExpired,
    });

    useVerificationExpireTimer({
        remainingSeconds: resendRemainingSeconds,
        setRemainingSeconds: setResendRemainingSeconds,
        onExpired: handleResendAvailable,
    });

    if (state.status === "CODE_INPUT") {
        return (
            <FindIdCodeInput
                code={code}
                remainingSeconds={remainingSeconds}
                resendRemainingSeconds={resendRemainingSeconds}
                message={message}
                resendMessage={resendMessage}
                verificationFeedback={verificationFeedback}
                hasReachedSendLimit={hasReachedSendLimit}
                isLoading={isLoading}
                isResending={isResending}
                canConfirmCode={canConfirmCode}
                canResendCode={canResendCode}
                onCodeChange={setCode}
                onSubmit={handleFindId}
                onResend={handleResendCode}
                onCloseVerificationFeedback={closeVerificationFeedback}
            />
        );
    }

    if (
        state.status === "FOUND" ||
        state.status === "NOT_FOUND" ||
        state.status === "ERROR"
    ) {
        return <FindIdResult result={state} />;
    }

    return (
        <FindIdEmailInput
            email={email}
            isLoading={isLoading}
            onEmailChange={setEmail}
            onSubmit={handleSendCode}
        />
    );
}