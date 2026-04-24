"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { HttpError } from "@/infrastructure/http/httpClient";
import { login } from "@/features/auth/application/usecase/login";
import { getOnboardingRoute } from "@/features/auth/application/onboarding/getOnboardingRoute";

export function useLogin() {
    const router = useRouter();

    const [loginId, setLoginId] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isValid = useMemo(() => {
        return loginId.trim().length > 0 && password.trim().length > 0;
    }, [loginId, password]);

    const submit = useCallback(async () => {
        if (!isValid || isSubmitting) return;

        setIsSubmitting(true);
        setErrorMessage(null);

        try {
            const response = await login({
                loginId: loginId.trim(),
                password,
            });

            router.replace(getOnboardingRoute(response.data.onboarding.nextStep));
        } catch (error) {
            if (error instanceof HttpError && error.status === 401) {
                setErrorMessage("아이디 또는 비밀번호가 올바르지 않습니다.");
            } else {
                setErrorMessage("로그인 중 문제가 발생했습니다.");
            }
        } finally {
            setIsSubmitting(false);
        }
    }, [isSubmitting, isValid, loginId, password, router]);

    return {
        loginId,
        setLoginId,
        password,
        setPassword,
        errorMessage,
        isSubmitting,
        isValid,
        submit,
    };
}