"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import type { AuthProvider } from "@/features/auth/domain/model/AuthProvider";

import SignupProgress from "@/features/signup/ui/components/SignupProgress";
import SignupLoginIdStep from "@/features/signup/ui/components/SignupLoginIdStep";
import SignupPasswordStep from "@/features/signup/ui/components/SignupPasswordStep";
import SignupEmailStep from "@/features/signup/ui/components/SignupEmailStep";
import SignupVerificationStep from "@/features/signup/ui/components/SignupVerificationStep";

import AuthPageHeader from "@/ui/components/AuthPageHeader";

import { accountStorage } from "@/features/signup/infrastructure/storage/accountStorage";
import { useLoginIdValidation } from "@/features/signup/application/hooks/useLoginIdValidation";
import { usePasswordValidation } from "@/features/signup/application/hooks/usePasswordValidation";
import { useEmailVerification } from "@/features/emailVerification/application/hooks/useEmailVerification";
import { useVerificationExpireTimer } from "@/features/emailVerification/application/hooks/useVerificationExpireTimer";
import { useResendTimer } from "@/features/emailVerification/application/hooks/useResendTimer";

import { authPageStyles } from "@/ui/styles/authPageStyles";

const providers: AuthProvider[] = ["GOOGLE", "KAKAO", "NAVER"];

type SignupStep = 1 | 2 | 3 | 4;

export default function SignupPage() {
    const router = useRouter();

    const [step, setStep] = useState<SignupStep>(1);

    const {
        loginId,
        status: loginIdStatus,
        message: loginIdMessage,
        canUseLoginId,
        handleLoginIdChange,
    } = useLoginIdValidation();

    const {
        password,
        isPasswordValid,
        message: passwordMessage,
        handlePasswordChange,
    } = usePasswordValidation();

    const {
        email,
        code: verificationCode,
        status: emailVerificationStatus,
        message: emailVerificationMessage,
        remainingSeconds,
        resendSeconds,
        verificationFeedback,
        hasSentVerificationEmail,
        hasReachedSendLimit,
        canSendVerificationEmail,
        canResendVerificationEmail,
        canConfirmVerificationEmail,
        setRemainingSeconds,
        setResendSeconds,
        handleExpired,
        handleEmailChange,
        handleCodeChange,
        closeVerificationFeedback,
        sendVerificationEmail,
        confirmVerificationEmail,
    } = useEmailVerification({
        purpose: "SIGNUP",
    });

    const { stopVerificationTimer } = useVerificationExpireTimer({
        remainingSeconds,
        setRemainingSeconds,
        onExpired: handleExpired,
    });

    useResendTimer({
        resendSeconds,
        setResendSeconds,
    });

    const handleBack = () => {
        if (step === 1) {
            router.push("/");
            return;
        }

        setStep((prev) => (prev - 1) as SignupStep);
    };

    const handleLoginIdSubmit = () => {
        if (!canUseLoginId) {
            return;
        }

        setStep(2);
    };

    const handlePasswordSubmit = () => {
        if (!isPasswordValid) {
            return;
        }

        setStep(3);
    };

    const handleEmailSubmit = async () => {
        if (hasSentVerificationEmail) {
            setStep(4);
            return;
        }

        const isSent = await sendVerificationEmail();

        if (!isSent) {
            return;
        }

        setStep(4);
    };

    const handleResendVerificationEmail = () => {
        void sendVerificationEmail();
    };

    const handleVerificationSubmit = async () => {
        if (!canConfirmVerificationEmail) {
            return;
        }

        const emailVerificationToken =
            await confirmVerificationEmail(stopVerificationTimer);

        if (!emailVerificationToken) {
            return;
        }

        accountStorage.save({
            id: loginId.trim(),
            password: password.trim(),
            email: email.trim(),
            emailVerificationToken,
            isSocial: false,
        });

        router.push("/terms");
    };

    const canResend =
        canResendVerificationEmail &&
        (resendSeconds === null || resendSeconds === 0);

    const verificationMessage =
        emailVerificationStatus === "EXPIRED"
            ? emailVerificationMessage
            : "";

    return (
        <main className={authPageStyles.page}>
            <AuthPageHeader
                backHref="/"
                backLabel={
                    step === 1
                        ? "홈으로 돌아가기"
                        : "이전 단계로 돌아가기"
                }
                onBack={handleBack}
            />

            <div className={authPageStyles.flowContent}>
                <SignupProgress
                    step={step}
                    totalSteps={4}
                />

                {step === 1 && (
                    <SignupLoginIdStep
                        loginId={loginId}
                        loginIdStatus={loginIdStatus}
                        loginIdMessage={loginIdMessage}
                        canUseLoginId={canUseLoginId}
                        providers={providers}
                        onLoginIdChange={handleLoginIdChange}
                        onSubmit={handleLoginIdSubmit}
                    />
                )}

                {step === 2 && (
                    <SignupPasswordStep
                        password={password}
                        isPasswordValid={isPasswordValid}
                        passwordMessage={passwordMessage}
                        onPasswordChange={handlePasswordChange}
                        onSubmit={handlePasswordSubmit}
                    />
                )}

                {step === 3 && (
                    <SignupEmailStep
                        email={email}
                        isSending={emailVerificationStatus === "SENDING"}
                        hasSentVerificationEmail={hasSentVerificationEmail}
                        canSendVerificationEmail={canSendVerificationEmail}
                        onEmailChange={handleEmailChange}
                        onSubmit={() => void handleEmailSubmit()}
                    />
                )}

                {step === 4 && (
                    <SignupVerificationStep
                        email={email}
                        code={verificationCode}
                        remainingSeconds={remainingSeconds}
                        resendSeconds={resendSeconds}
                        message={verificationMessage}
                        verificationFeedback={verificationFeedback}
                        isVerifying={emailVerificationStatus === "VERIFYING"}
                        hasReachedSendLimit={hasReachedSendLimit}
                        canConfirmVerificationEmail={canConfirmVerificationEmail}
                        canResendVerificationEmail={canResend}
                        onCodeChange={handleCodeChange}
                        onConfirm={() => void handleVerificationSubmit()}
                        onResend={handleResendVerificationEmail}
                        onCloseVerificationFeedback={closeVerificationFeedback}
                    />
                )}
            </div>
        </main>
    );
}