"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useReCaptcha } from "next-recaptcha-v3";

import { HttpError } from "@/infrastructure/http/httpClient";
import { login } from "@/features/auth/application/usecase/login";
import { getOnboardingRoute } from "@/features/auth/application/onboarding/getOnboardingRoute";
import { executeLoginCaptcha } from "@/features/auth/infrastructure/recaptcha/executeLoginCaptcha";

const CAPTCHA_LOAD_ERROR_MESSAGE = "자동입력 방지 확인을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.";
const CAPTCHA_PREPARING_MESSAGE = "자동입력 방지 확인을 준비하고 있습니다.";
const CAPTCHA_EXECUTION_ERROR_MESSAGE = "자동입력 방지 확인에 실패했습니다. 잠시 후 다시 시도해주세요.";

const LOGIN_ERROR_MESSAGE_BY_CODE: Readonly<Record<string, string>> = {
    AUTH_CAPTCHA_VERIFICATION_FAILED: "자동입력 방지 확인에 실패했습니다. 다시 시도해주세요.",
    AUTH_CAPTCHA_SERVICE_UNAVAILABLE: "자동입력 방지 서비스를 사용할 수 없습니다. 잠시 후 다시 시도해주세요.",
};

function getLoginErrorMessage(error: unknown): string {
    if (!(error instanceof HttpError)) {
        return "로그인 요청 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.";
    }

    const errorMessage =
        LOGIN_ERROR_MESSAGE_BY_CODE[error.body?.error?.code ?? ""];

    return (
        errorMessage
        ?? (error.status === 401
            ? "아이디 또는 비밀번호가 올바르지 않습니다."
            : "로그인에 실패했습니다.")
    );
}

export function useLogin() {
    const router = useRouter();
    const {
        executeRecaptcha,
        loaded: isCaptchaLoaded,
        error: captchaLoadError,
    } = useReCaptcha();

    const isCaptchaExecutingRef = useRef(false);

    const [loginId, setLoginId] = useState("");
    const [password, setPassword] = useState("");
    const [loginErrorMessage, setLoginErrorMessage] = useState<string | null>(null);
    const [captchaErrorMessage, setCaptchaErrorMessage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isCaptchaReady = isCaptchaLoaded && !captchaLoadError;

    const isValid = useMemo(() => {
        return (
            loginId.trim().length > 0
            && password.trim().length > 0
            && isCaptchaReady
        );
    }, [isCaptchaReady, loginId, password]);

    const executeCaptcha = useCallback(async (): Promise<string | null> => {
        if (isCaptchaExecutingRef.current) {
            return null;
        }

        if (!isCaptchaReady) {
            setCaptchaErrorMessage(
                captchaLoadError
                    ? CAPTCHA_LOAD_ERROR_MESSAGE
                    : CAPTCHA_PREPARING_MESSAGE,
            );
            return null;
        }

        isCaptchaExecutingRef.current = true;
        setCaptchaErrorMessage(null);

        try {
            return await executeLoginCaptcha(executeRecaptcha);
        } catch {
            setCaptchaErrorMessage(CAPTCHA_EXECUTION_ERROR_MESSAGE);
            return null;
        } finally {
            isCaptchaExecutingRef.current = false;
        }
    }, [captchaLoadError, executeRecaptcha, isCaptchaReady]);

    const submit = useCallback(async () => {
        if (!isValid || isSubmitting) return;

        setIsSubmitting(true);
        setLoginErrorMessage(null);
        setCaptchaErrorMessage(null);

        const captchaToken = await executeCaptcha();

        if (!captchaToken) {
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await login({
                loginId: loginId.trim(),
                password,
                captchaToken,
            });

            router.replace(getOnboardingRoute(response.data.onboarding.nextStep));
        } catch (error) {
            setLoginErrorMessage(getLoginErrorMessage(error));
        } finally {
            setIsSubmitting(false);
        }
    }, [
        executeCaptcha,
        isSubmitting,
        isValid,
        loginId,
        password,
        router,
    ]);

    return {
        loginId,
        setLoginId,
        password,
        setPassword,
        errorMessage:
            captchaLoadError
                ? CAPTCHA_LOAD_ERROR_MESSAGE
                : captchaErrorMessage ?? loginErrorMessage,
        captchaStatusMessage:
            !isCaptchaLoaded && !captchaLoadError
                ? CAPTCHA_PREPARING_MESSAGE
                : null,
        isSubmitting,
        isValid,
        submit,
    };
}