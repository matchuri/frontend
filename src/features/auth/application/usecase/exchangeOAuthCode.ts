import { authApi } from "@/features/auth/infrastructure/api/authApi";
import type { AuthProvider } from "@/features/auth/domain/model/AuthProvider";
import {
    clearAuth,
    setAuthenticated,
    setAuthLoading,
} from "@/features/auth/application/store/authStore";
import { logger } from "@/shared/lib/logger";

export async function exchangeOAuthCode(
    provider: AuthProvider,
    code: string,
) {
    logger.log("🚀 exchangeOAuthCode 호출:", { provider, code });
    setAuthLoading();

    try {
        const response = await authApi.exchangeCode(provider, code);
        logger.log("✅ exchange 응답:", response);
        const accessToken = response.data.accessToken;
        const onboarding = response.data.onboarding;

        setAuthenticated(
            accessToken,
            onboarding,
            response.data.member,
        );

        logger.log("accessToken 저장 완료:", accessToken);
        logger.log("onboarding:", onboarding);

        return response;
    } catch (error) {
        clearAuth();
        throw error;
    }
}