"use client";

import { useCallback, useRef, useState } from "react";
import { useReCaptcha } from "next-recaptcha-v3";

const LOGIN_RECAPTCHA_ACTION = "login";
const RECAPTCHA_LOAD_ERROR_MESSAGE = "자동입력 방지 확인을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.";
const RECAPTCHA_PREPARING_MESSAGE = "자동입력 방지 확인을 준비하고 있습니다. 잠시 후 다시 시도해주세요.";
const RECAPTCHA_EXECUTION_ERROR_MESSAGE = "자동입력 방지 확인에 실패했습니다. 잠시 후 다시 시도해주세요.";

export function useLoginCaptcha() {
    const { executeRecaptcha, loaded: isLoaded, error: loadError, } = useReCaptcha();
    const isExecutingRef = useRef(false);
    const [executionErrorMessage, setExecutionErrorMessage] = useState<string | null>(null);

    const execute = useCallback(async (): Promise<string | null> => {
        if (!isLoaded || loadError || isExecutingRef.current) {
            setExecutionErrorMessage(
                loadError
                    ? RECAPTCHA_LOAD_ERROR_MESSAGE
                    : RECAPTCHA_PREPARING_MESSAGE,
            );
            return null;
        }

        isExecutingRef.current = true;
        setExecutionErrorMessage(null);

        try {
            const token = await executeRecaptcha(LOGIN_RECAPTCHA_ACTION);
            if (!token) {
                throw new Error("reCAPTCHA token is empty");
            }
            return token;
        } catch {
            setExecutionErrorMessage(RECAPTCHA_EXECUTION_ERROR_MESSAGE);
            return null;
        } finally {
            isExecutingRef.current = false;
        }
    }, [executeRecaptcha, isLoaded, loadError]);

    return {
        execute,
        errorMessage: loadError
            ? RECAPTCHA_LOAD_ERROR_MESSAGE
            : executionErrorMessage,
        isReady: isLoaded && !loadError,
    };
}
