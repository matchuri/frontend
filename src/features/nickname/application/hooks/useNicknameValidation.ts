"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { existsNickname } from "@/features/nickname/infrastructure/api/nicknameApi";

type NicknameValidationStatus =
    | "IDLE"
    | "CHECKING"
    | "AVAILABLE"
    | "DUPLICATED"
    | "INVALID"
    | "ERROR"
    | "UNCHANGED";

interface UseNicknameValidationParams {
    initialNickname?: string;
}

export function useNicknameValidation({
    initialNickname = "",
}: UseNicknameValidationParams = {}) {
    const [nickname, setNickname] = useState(initialNickname);
    const [status, setStatus] =
        useState<NicknameValidationStatus>(
            initialNickname ? "UNCHANGED" : "IDLE",
        );
    const [message, setMessage] = useState("");

    const debounceRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
        };
    }, []);

    const validateNickname = useCallback(
         (nextNickname: string) => {
            const trimmedNickname = nextNickname.trim();

            // debounce 이전 타이머 제거
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }

            // 초기값과 동일
            if (initialNickname && trimmedNickname === initialNickname) {
                setStatus("UNCHANGED");
                setMessage("");
                return;
            }

            // 공백만 입력
            if (trimmedNickname.length === 0) {
                setStatus("INVALID");
                setMessage("닉네임은 공백만 입력할 수 없습니다.");
                return;
            }

            // 길이 초과
            if (trimmedNickname.length > 100) {
                setStatus("INVALID");
                setMessage("닉네임은 최대 100자까지 입력할 수 있습니다.");
                return;
            }

            // 유효성 통과 → debounce 후 API 호출
            setStatus("CHECKING");
            setMessage("닉네임 중복을 확인하는 중입니다.");

            debounceRef.current = setTimeout(async () => {
                try {
                    const exists = await existsNickname(trimmedNickname);

                    if (exists) {
                        setStatus("DUPLICATED");
                        setMessage("이미 사용 중인 닉네임입니다.");
                        return;
                    }

                    setStatus("AVAILABLE");
                    setMessage("사용 가능한 닉네임입니다.");
                } catch {
                    setStatus("ERROR");
                    setMessage("닉네임 중복 확인에 실패했습니다.");
                }
            }, 500);
        },
        [initialNickname],
    );

    const handleNicknameChange = (nextNickname: string) => {
        setNickname(nextNickname);
        setStatus("IDLE");
        setMessage("");
    };

    const canSaveNickname = status === "AVAILABLE";

    return {
        nickname,
        status,
        message,
        canSaveNickname,
        handleNicknameChange,
        validateNickname,
    };
}