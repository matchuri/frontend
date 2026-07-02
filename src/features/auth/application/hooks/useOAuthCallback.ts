"use client";

import { useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { logger } from "@/shared/lib/logger";
import { AuthProviderMap } from "@/features/auth/domain/model/AuthProviderMap";
import { exchangeOAuthCode } from "@/features/auth/application/usecase/exchangeOAuthCode";
import { getOnboardingRoute } from "@/features/auth/application/onboarding/getOnboardingRoute";

const OAUTH_PROCESSING_CODE_KEY = "oauth_processing_code";

export function useOAuthCallback() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const params = useParams<{ provider: string }>();

    useEffect(() => {
        const run = async () => {
            const loginResult = searchParams.get("loginResult");
            const code = searchParams.get("code");
            const errorCode = searchParams.get("errorCode");

            const providerParam = params.provider;
            const normalizedProvider = AuthProviderMap[providerParam];

            logger.log("📌 callback params:", {
                loginResult,
                code,
                errorCode,
                providerParam,
                normalizedProvider,
            });

            // 1. provider 유효성 체크
            if (!normalizedProvider) {
                router.replace("/auth/login?error=invalid_provider");
                return;
            }

            // 2. OAuth 실패 케이스
            if (loginResult === "failed") {
                router.replace(
                    `/auth/login?error=${encodeURIComponent(errorCode ?? "oauth_failed")}`,
                );
                return;
            }

            // 3. 잘못된 콜백 접근
            if (loginResult !== "success") {
                router.replace("/auth/login?error=invalid_callback");
                return;
            }

            // 4. code 없음
            if (!code) {
                router.replace("/auth/login?error=missing_code");
                return;
            }

            const processingCode = sessionStorage.getItem(OAUTH_PROCESSING_CODE_KEY);

            if (processingCode === code) {
                logger.warn("이미 처리 중인 OAuth code입니다. 중복 exchange를 막습니다.");
                return;
            }

            sessionStorage.setItem(OAUTH_PROCESSING_CODE_KEY, code);

            try {
                logger.log("🚀 exchange 요청 직전");

                // 5. 서버에 code 전달 → 토큰 + onboarding 받기
                const response = await exchangeOAuthCode(normalizedProvider, code);

                logger.log("✅ exchange 성공:", response);

                // 6. onboarding 기준으로 분기
                const nextStep = response.data.onboarding.nextStep;
                router.replace(getOnboardingRoute(nextStep));
            } catch (error) {
                logger.error("🚫OAuth exchange 실패:", error);

                // 디버깅 중에는 이동 막기
//                 router.replace("/auth/login?error=exchange_failed");
            }
        };

        run();
    }, [router, searchParams, params.provider]);
}