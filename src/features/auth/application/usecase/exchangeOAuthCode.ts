import { authApi } from "@/features/auth/infrastructure/api/authApi";
import type { AuthProvider } from "@/features/auth/domain/model/AuthProvider";

export async function exchangeOAuthCode(
    provider: AuthProvider,
    code: string
) {
    const response = await authApi.exchangeCode(provider, code);
    // TODO: 토큰 저장

    return response;
}