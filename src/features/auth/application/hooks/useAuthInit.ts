"use client";

import { useEffect } from "react";
import {
    setLoading,
    setAuthenticated,
    clearAuth,
    getAccessToken,
} from "@/features/auth/application/store/authStore";
import { clientEnv } from "@/infrastructure/config/env";

export function useAuthInit() {
    useEffect(() => {
        const init = async () => {
            console.log("[AuthInit] 시작");

            // 이미 accessToken 있으면 skip
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
                    throw new Error(`refresh 실패: ${response.status}`);
                }

                const data = await response.json();

                const accessToken = data.data?.accessToken;

                // accessToken 없으면 실패 처리
                if (!accessToken) {
                    throw new Error("accessToken 없음");
                }

                setAuthenticated(accessToken);

                console.log("[AuthInit] 자동 로그인 성공");
            } catch (error) {
                console.log("[AuthInit] 자동 로그인 실패", error);

                clearAuth();
            }
        };

        init();
    }, []);
}