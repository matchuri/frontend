"use client";

import { useEffect } from "react";
import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";

import { useLogin } from "@/features/auth/application/hooks/useLogin";
import { getPostAuthenticationRoute } from "@/features/auth/application/onboarding/getPostAuthenticationRoute";
import {
    isAuthenticatedAtom,
    isAuthLoadingAtom,
    onboardingAtom,
} from "@/features/auth/application/selectors/authSelectors";

import LoginView from "@/features/auth/ui/components/LoginView";
import AuthPageSkeleton from "@/features/auth/ui/components/AuthPageSkeleton";

export default function LoginPage() {
    const router = useRouter();
    const isAuthenticated = useAtomValue(isAuthenticatedAtom);
    const isAuthLoading = useAtomValue(isAuthLoadingAtom);
    const onboarding = useAtomValue(onboardingAtom);

    const {
        loginId,
        setLoginId,
        password,
        setPassword,
        errorMessage,
        captchaStatusMessage,
        isSubmitting,
        isValid,
        submit,
    } = useLogin();

    useEffect(() => {
        if (!isAuthLoading &&
            isAuthenticated &&
            onboarding
        ) {
            router.replace(
                getPostAuthenticationRoute(
                    onboarding.nextStep,
                ),
            );
        }
    }, [
        isAuthLoading,
        isAuthenticated,
        onboarding,
        router,
    ]);

    if (isAuthLoading) {
        return <AuthPageSkeleton variant="LOGIN" />;
    }

    return (
        <LoginView
            loginId={loginId}
            password={password}
            errorMessage={errorMessage}
            captchaStatusMessage={captchaStatusMessage}
            isSubmitting={isSubmitting}
            isValid={isValid}
            onLoginIdChange={setLoginId}
            onPasswordChange={setPassword}
            onSubmit={submit}
        />
    );
}