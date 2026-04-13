"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthProviderMap } from "@/features/auth/domain/model/AuthProviderMap";
import type { AuthProvider } from "@/features/auth/domain/model/AuthProvider";
import { useOAuthExchange } from "@/features/auth/application/hooks/useOAuthExchange";

export function useOAuthCallback() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const { exchangeOAuthCode } = useOAuthExchange();

    useEffect(() => {
        const run = async () => {
            const loginResult = searchParams.get("loginResult");
            const provider = searchParams.get("provider");
            const code = searchParams.get("code");
            const errorCode = searchParams.get("errorCode");

            // 실패 케이스
            if (loginResult === "failed") {
                console.error("OAuth 로그인 실패:", errorCode);

                router.replace(
                    `/login?error=${errorCode ?? "oauth_failed"}`
                );
                return;
            }

            // success인데 code 없음
            if (loginResult === "success" && !code) {
                console.error("code 없음");
                router.replace("/login?error=missing_code");
                return;
            }

            // provider or code 없음
            if (!provider || !code) {
                console.error("provider 또는 code 없음", {
                    provider,
                    code,
                });
                router.replace("/login?error=invalid_callback");
                return;
            }

            const normalizedProvider = AuthProviderMap[provider];

            // provider 매핑 실패
            if (!normalizedProvider) {
                console.error("지원하지 않는 provider:", provider);
                router.replace("/login?error=invalid_provider");
                return;
            }

            try {
                const response = await exchangeOAuthCode(
                    normalizedProvider as AuthProvider,
                    code
                );

                // 성공 로그
                console.log("OAuth exchange 성공");
                console.log("response:", response.data);
                console.log("accessToken:", response.data.accessToken);
                console.log("member:", response.data.member);

                router.replace("/");
            } catch (e) {
                console.error("exchange 실패:", e);
                router.replace("/login?error=exchange_failed");
            }
        };

        run();
    }, [router, searchParams, exchangeOAuthCode]);
}