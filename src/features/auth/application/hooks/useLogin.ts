"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { HttpError } from "@/infrastructure/http/httpClient";
import { login } from "@/features/auth/application/usecase/login";
import { getOnboardingRoute } from "@/features/auth/application/onboarding/getOnboardingRoute";
import { useLoginCaptcha } from "@/features/auth/infrastructure/recaptcha/useLoginCaptcha";

export function useLogin() {
    const router = useRouter();
    const { execute: executeCaptcha, errorMessage: captchaErrorMessage, isReady: isCaptchaReady, } = useLoginCaptcha();

    const [loginId, setLoginId] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isValid = useMemo(() => {
        return loginId.trim().length > 0
            && password.trim().length > 0
            && isCaptchaReady;
    }, [isCaptchaReady, loginId, password]);

    const submit = useCallback(async () => {
        if (!isValid || isSubmitting) return;

        setIsSubmitting(true);
        setErrorMessage(null);

        const recaptchaToken = await executeCaptcha();
        if (!recaptchaToken) {
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await login({
                loginId: loginId.trim(),
                password,
                recaptchaToken,
            });

            router.replace(getOnboardingRoute(response.data.onboarding.nextStep));
        } catch (error) {
            const errorCode = error instanceof HttpError
                ? error.body?.error?.code
                : undefined;

            if (errorCode === "AUTH_CAPTCHA_VERIFICATION_FAILED") {
                setErrorMessage("자동입력 방지 확인에 실패했습니다. 다시 시도해주세요.");
            } else if (errorCode === "AUTH_CAPTCHA_SERVICE_UNAVAILABLE") {
                setErrorMessage(
                    "자동입력 방지 서비스를 사용할 수 없습니다. 잠시 후 다시 시도해주세요.",
                );
            } else if (error instanceof HttpError && error.status === 401) {
                setErrorMessage("아이디 또는 비밀번호가 올바르지 않습니다.");
            } else {
                setErrorMessage("로그인에 실패했습니다.");
            }
        } finally {
            setIsSubmitting(false);
        }
    }, [executeCaptcha, isSubmitting, isValid, loginId, password, router]);

    return {
        loginId,
        setLoginId,
        password,
        setPassword,
        errorMessage: captchaErrorMessage ?? errorMessage,
        isSubmitting,
        isValid,
        submit,
    };
}