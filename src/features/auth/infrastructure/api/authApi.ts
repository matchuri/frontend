import { httpClient } from "@/infrastructure/http/httpClient";
import type { OAuthExchangeResponse } from "@/features/auth/domain/model/OAuthExchangeResponse";

export const authApi = {
    exchangeCode: (provider: string, code: string) => {
        return httpClient.post<OAuthExchangeResponse>(
            "/api/v1/auth/oauth2/exchange",
            {
                provider,
                code,
            }
        );
    },
};