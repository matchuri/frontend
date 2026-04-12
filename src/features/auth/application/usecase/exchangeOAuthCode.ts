import { authApi } from "@/features/auth/infrastructure/api/authApi";
import type { AuthProvider } from "@/features/auth/domain/model/AuthProvider";
import {
    setAuthenticated,
    clearAuth,
    setLoading,
} from "@/features/auth/application/store/authStore";

export async function exchangeOAuthCode(
    provider: AuthProvider,
    code: string
) {
    // TODO: 앱 진입시 하는 걸로 변경 필요
    setLoading();

    try {
        const response = await authApi.exchangeCode(provider, code);
        const accessToken = response.data.accessToken;

        // 로그인 성공 상태 저장
        setAuthenticated(accessToken);

        console.log("accessToken 저장 완료:", accessToken);
        return response;

    } catch (error) {
        // 로그인 실패
        clearAuth();

        console.error("OAuth exchange 실패:", error);
        throw error;
    }
}