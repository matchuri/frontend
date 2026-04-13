import { authApi } from "@/features/auth/infrastructure/api/authApi";
import type { AuthProvider } from "@/features/auth/domain/model/AuthProvider";

export async function exchangeOAuthCode(
    provider: AuthProvider,
    code: string,
    actions: {
        setLoading: () => void;
        setAuthenticated: (token: string) => void;
        clearAuth: () => void;
    }
) {
    actions.setLoading();

    try {
        const response = await authApi.exchangeCode(provider, code);
        const accessToken = response.data.accessToken;

        actions.setAuthenticated(accessToken);
        console.log("accessToken 저장 완료:", accessToken);

        return response;
    } catch (error) {
        actions.clearAuth();
        console.error("OAuth exchange 실패:", error);

        throw error;
    }
}