"use client";

import { useEffect } from "react";
import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";

import { useLogin } from "@/features/auth/application/hooks/useLogin";
import {
    isAuthenticatedAtom,
    isAuthLoadingAtom,
} from "@/features/auth/application/selectors/authSelectors";

import LoginView from "@/features/auth/ui/components/LoginView";
import AuthPageSkeleton from "@/features/auth/ui/components/AuthPageSkeleton";

export default function LoginPage() {
    const router = useRouter();
    const isAuthenticated = useAtomValue(isAuthenticatedAtom);
    const isAuthLoading = useAtomValue(isAuthLoadingAtom);

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
        if (!isAuthLoading && isAuthenticated) {
            router.replace("/home");
        }
    }, [isAuthLoading, isAuthenticated, router]);

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