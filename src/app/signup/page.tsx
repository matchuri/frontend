"use client";

import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";

import type { AuthProvider } from "@/features/auth/domain/model/AuthProvider";
import {
    isAuthenticatedAtom,
    isAuthLoadingAtom,
    onboardingAtom,
} from "@/features/auth/application/selectors/authSelectors";
import { getOnboardingRoute } from "@/features/auth/application/onboarding/getOnboardingRoute";

import SignupProgress from "@/features/signup/ui/components/SignupProgress";
import SignupLoginIdStep from "@/features/signup/ui/components/SignupLoginIdStep";
import SignupPasswordStep from "@/features/signup/ui/components/SignupPasswordStep";
import SignupEmailStep from "@/features/signup/ui/components/SignupEmailStep";
import SignupVerificationStep from "@/features/signup/ui/components/SignupVerificationStep";

import AuthPageHeader from "@/ui/components/AuthPageHeader";

import { accountStorage } from "@/features/signup/infrastructure/storage/accountStorage";
import { signupOnboardingModeStorage } from "@/features/signup/infrastructure/storage/signupOnboardingModeStorage";
import { useLoginIdValidation } from "@/features/signup/application/hooks/useLoginIdValidation";
import { usePasswordValidation } from "@/features/signup/application/hooks/usePasswordValidation";
import { useEmailVerification } from "@/features/emailVerification/application/hooks/useEmailVerification";
import { useVerificationExpireTimer } from "@/features/emailVerification/application/hooks/useVerificationExpireTimer";
import { useResendTimer } from "@/features/emailVerification/application/hooks/useResendTimer";

import { clearSignupData } from "@/features/signup/application/usecase/clearSignupData";

import { authPageStyles } from "@/ui/styles/authPageStyles";

const providers: AuthProvider[] = ["GOOGLE", "KAKAO", "NAVER"];

type SignupStep = 1 | 2 | 3 | 4;

export default function SignupPage() {
    const router = useRouter();

    const isAuthLoading = useAtomValue(isAuthLoadingAtom);
    const isAuthenticated = useAtomValue(isAuthenticatedAtom);
    const onboarding = useAtomValue(onboardingAtom);

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

    useEffect(() => {
        if (isAuthLoading) {
            return;
        }

        const signupMode = signupOnboardingModeStorage.load();

        if (isAuthenticated) {
            if (!onboarding?.nextStep) {
                router.replace("/home");
                return;
            }

            if (
                signupMode === "SOCIAL" &&
                onboarding.nextStep === "READY"
            ) {
                router.replace("/signup/preference");
                return;
            }

            router.replace(
                getOnboardingRoute(onboarding.nextStep),
            );
            return;
        }

        signupOnboardingModeStorage.save("GENERAL");
    }, [
        isAuthLoading,
        isAuthenticated,
        onboarding,
        router,
    ]);

    const handleBack = () => {
        if (step === 1) {
            clearSignupData();
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

    if (isAuthLoading || isAuthenticated) {
        return null;
    }

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
                    label="계정 만들기"
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