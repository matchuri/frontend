"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { existsLoginId } from "@/features/signup/infrastructure/api/signupApi";

type LoginIdValidationStatus =
    | "IDLE"
    | "CHECKING"
    | "AVAILABLE"
    | "DUPLICATED"
    | "INVALID"
    | "ERROR";

const LOGIN_ID_REGEX = /^[A-Za-z0-9._-]{1,50}$/;

export function useLoginIdValidation() {
    const [loginId, setLoginId] = useState("");
    const [status, setStatus] = useState<LoginIdValidationStatus>("IDLE");
    const [message, setMessage] = useState("");

    const debounceRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
        };
    }, []);

    const validateLoginId = useCallback((nextLoginId: string) => {
        const trimmedLoginId = nextLoginId.trim();

        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        if (!trimmedLoginId) {
            setStatus("IDLE");
            setMessage("");
            return;
        }

        if (!LOGIN_ID_REGEX.test(trimmedLoginId)) {
            setStatus("INVALID");
            setMessage("영문, 숫자, ., _, - 만 사용 가능하며 1~50자여야 합니다.");
            return;
        }

        setStatus("CHECKING");
        setMessage("확인 중...");

        debounceRef.current = setTimeout(async () => {
            try {
                const exists = await existsLoginId(trimmedLoginId);

                if (exists) {
                    setStatus("DUPLICATED");
                    setMessage("이미 사용 중인 ID입니다.");
                    return;
                }

                setStatus("AVAILABLE");
                setMessage("사용 가능한 ID입니다.");
            } catch {
                setStatus("ERROR");
                setMessage("아이디 중복 확인에 실패했습니다.");
            }
        }, 500);
    }, []);

    const handleLoginIdChange = (nextLoginId: string) => {
        setLoginId(nextLoginId);
        validateLoginId(nextLoginId);
    };

    const canUseLoginId = status === "AVAILABLE";

    return {
        loginId,
        status,
        message,
        canUseLoginId,
        handleLoginIdChange,
        validateLoginId,
    };
}