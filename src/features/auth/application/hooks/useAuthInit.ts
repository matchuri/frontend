"use client";

import { useEffect } from "react";
import { useAuthAction } from "@/features/auth/application/hooks/useAuthAction";
import { getAccessToken } from "@/features/auth/infrastructure/token/authTokenProvider";
import { clientEnv } from "@/infrastructure/config/env";

export function useAuthInit() {
    const { setLoading, setAuthenticated, clearAuth } = useAuthAction();

    useEffect(() => {
        const init = async () => {
            console.log("[AuthInit] 시작");

            const existingToken = getAccessToken();
            if (existingToken) {
                console.log("[AuthInit] 이미 로그인 상태 → skip");
                return;
            }

            setLoading();

            try {
                const response = await fetch(
                    `${clientEnv.apiBaseUrl}/api/v1/auth/refresh`,
                    {
                        method: "POST",
                        credentials: "include",
                    }
                );

                if (!response.ok) {
                    throw new Error("refresh 실패");
                }

                const data = await response.json();
                const token = data.data?.accessToken;

                if (!token) throw new Error("accessToken 없음");

                setAuthenticated(token);

                console.log("[AuthInit] 자동 로그인 성공");

            } catch (error) {
                clearAuth();
                console.log("[AuthInit] 자동 로그인 실패", error);
            }
        };

        init();
    }, [setLoading, setAuthenticated, clearAuth]);
}