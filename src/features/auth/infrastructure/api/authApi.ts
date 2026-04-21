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

interface NickNameExistsResponse {
    success: boolean;
    data: {
        nickname: string;
        exists: boolean;
    };
    error: null;
}

interface SignupRequest {
    loginId: string;
    password: string;
    nickname: string;
    agreements: {
        agreementType: string;
        agreementVersion: string;
    }[];
}

interface SignupResponse {
    success: boolean;
    data: null;
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

    checkNicknameExists: (nickName: string) => {
        return httpClient.get<NickNameExistsResponse>(
            `/api/v1/members/exists/nickname/${nickName}`
        );
    },

    signup: (payload: SignupRequest) => {
        return httpClient.post<SignupResponse>(
            "/api/v1/members/signup",
            payload
        );
    },
};