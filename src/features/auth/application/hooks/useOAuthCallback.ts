"use client";

import { useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { AuthProviderMap } from "@/features/auth/domain/model/AuthProviderMap";
import { exchangeOAuthCode } from "@/features/auth/application/usecase/exchangeOAuthCode";

export function useOAuthCallback() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const params = useParams<{ provider: string }>();

    useEffect(() => {
        let cancelled = false;

        const run = async () => {
            const loginResult = searchParams.get("loginResult");
            const code = searchParams.get("code");
            const errorCode = searchParams.get("errorCode");

            const providerParam = params.provider;
            const normalizedProvider = AuthProviderMap[providerParam];

            if (!normalizedProvider) {
                router.replace("/auth/login?error=invalid_provider");
                return;
            }

            if (loginResult === "failed") {
                router.replace(
                    `/auth/login?error=${encodeURIComponent(errorCode ?? "oauth_failed")}`,
                );
                return;
            }

            if (loginResult !== "success") {
                router.replace("/auth/login?error=invalid_callback");
                return;
            }

            if (!code) {
                router.replace("/auth/login?error=missing_code");
                return;
            }

            try {
                const response = await exchangeOAuthCode(normalizedProvider, code);

                if (cancelled) return;

                /**
                 * 추후 회원가입 분기 확장 포인트
                 *
                 * 예:
                 * if (response.data.nextAction === "SIGNUP_REQUIRED") {
                 *   router.replace("/signup/terms");
                 *   return;
                 * }
                 */

                void response;
                router.replace("/home");
            } catch {
                if (!cancelled) {
                    router.replace("/auth/login?error=exchange_failed");
                }
            }
        };

        run();

        return () => {
            cancelled = true;
        };
    }, [router, searchParams, params.provider]);
}