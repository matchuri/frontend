import { httpClient } from "@/infrastructure/http/httpClient";
import type { AuthProvider } from "@/features/auth/domain/model/AuthProvider";
import type { OAuthExchangeResponse } from "@/features/auth/infrastructure/api/dto/OAuthExchangeResponse";
import type { RefreshResponse } from "@/features/auth/infrastructure/api/dto/RefreshResponse";
import type { LogoutResponse } from "@/features/auth/infrastructure/api/dto/LogoutResponse";
import type { LoginRequest } from "@/features/auth/domain/model/LoginRequest";
import type { LoginResponse } from "@/features/auth/infrastructure/api/dto/LoginResponse";

export const authApi = {
    exchangeCode(provider: AuthProvider, code: string) {
        return httpClient.post<OAuthExchangeResponse>(
            "/api/v1/auth/oauth2/exchange",
            {
                provider,
                code,
            },
        );
    },

    refresh() {
        return httpClient.post<RefreshResponse>("/api/v1/auth/refresh");
    },

    logout() {
        return httpClient.post<LogoutResponse>("/api/v1/auth/logout");
    },

    login(payload: LoginRequest) {
        return httpClient.post<LoginResponse>("/api/v1/auth/login", payload);
    },
} as const;