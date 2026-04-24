import { httpClient } from "@/infrastructure/http/httpClient";
import type { AuthProvider } from "@/features/auth/domain/model/AuthProvider";
import type { OAuthExchangeResponse } from "@/features/auth/infrastructure/api/dto/OAuthExchangeResponse";
import type { RefreshResponse } from "@/features/auth/infrastructure/api/dto/RefreshResponse";
import type { LogoutResponse } from "@/features/auth/infrastructure/api/dto/LogoutResponse";
import type { LoginRequest } from "@/features/auth/domain/model/LoginRequest";
import type { LoginResponse } from "@/features/auth/infrastructure/api/dto/LoginResponse";
import type { SubmitAgreementsResponse } from "@/features/auth/infrastructure/api/dto/SubmitAgreementsResponse";
import type { UpdateNicknameResponse } from "@/features/auth/infrastructure/api/dto/UpdateNicknameResponse";

interface LoginIdExistsResponse {
    success: boolean;
    data: {
        loginId: string;
        exists: boolean;
    };
    error: null;
}

interface SubmitAgreementsRequest {
    agreements: {
        agreementType: string;
        agreementVersion: string;
    }[];
}

interface UpdateNicknameRequest {
    nickname: string;
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

    checkLoginIdExists(loginId: string) {
        return httpClient.get<LoginIdExistsResponse>(
            `/api/v1/members/exists/${loginId}`,
        );
    },

    checkNicknameExists(nickname: string) {
        return httpClient.get<NickNameExistsResponse>(
            `/api/v1/members/exists/nickname/${nickname}`,
        );
    },

    signup(payload: SignupRequest) {
        return httpClient.post<SignupResponse>(
            "/api/v1/members/signup",
            payload,
        );
    },

    submitRequiredAgreements(payload: SubmitAgreementsRequest) {
        return httpClient.post<SubmitAgreementsResponse>(
            "/api/v1/member-agreements/consents",
            payload,
        );
    },

    updateOnboardingNickname(payload: UpdateNicknameRequest) {
        return httpClient.patch<UpdateNicknameResponse>(
            "/api/v1/members/me",
            payload,
        );
    },
} as const;