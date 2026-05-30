import { authApi } from "@/features/auth/infrastructure/api/authApi";
import type { AuthProvider } from "@/features/auth/domain/model/AuthProvider";
import {
    clearAuth,
    setAuthenticated,
    setAuthLoading,
} from "@/features/auth/application/store/authStore";

export async function exchangeOAuthCode(
    provider: AuthProvider,
    code: string,
) {
    console.log("🚀 exchangeOAuthCode 호출:", { provider, code });
    setAuthLoading();

    try {
        const response = await authApi.exchangeCode(provider, code);
        console.log("✅ exchange 응답:", response);
        const accessToken = response.data.accessToken;
        const onboarding = response.data.onboarding;

        setAuthenticated(
            accessToken,
            onboarding,
            response.data.member,
        );

        console.log("accessToken 저장 완료:", accessToken);
        console.log("onboarding:", onboarding);

        return response;
    } catch (error) {
        clearAuth();
        throw error;
    }
}