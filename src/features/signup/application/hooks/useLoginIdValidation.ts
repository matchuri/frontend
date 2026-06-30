"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { signupApi } from "@/features/signup/infrastructure/api/signupApi";

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

        if (!nextLoginId) {
            setStatus("IDLE");
            setMessage("");
            return;
        }

        // 공백 체크
        if (/\s/.test(nextLoginId)) {
          setStatus("INVALID");
          setMessage("공백을 사용할 수 없습니다.");
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
                const response = await signupApi.checkLoginIdExists(trimmedLoginId);
                console.log("아이디 뭐 들어와?:", response);

                if (response.data.exists) {
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