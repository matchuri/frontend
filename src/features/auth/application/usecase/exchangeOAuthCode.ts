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
    setAuthLoading();

    try {
        const response = await authApi.exchangeCode(provider, code);
        const accessToken = response.data.accessToken;

        setAuthenticated(accessToken);
        console.log("accessToken 저장 완료:", accessToken);

        return response;
    } catch (error) {
        clearAuth();
        throw error;
    }
}