import { httpClient } from "@/infrastructure/http/httpClient";
import type { OAuthExchangeResponse } from "@/features/auth/domain/model/OAuthExchangeResponse";

interface LoginIdExistsResponse {
    success: boolean;
    data: {
        loginId: string;
        exists: boolean;
    };
    error: null;
}

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

    checkLoginIdExists: (loginId: string) => {
        return httpClient.get<LoginIdExistsResponse>(
          `/api/v1/members/exists/${loginId}`
        );
    },
};