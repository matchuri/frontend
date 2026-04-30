import { httpClient } from "@/infrastructure/http/httpClient";

interface ApiError {
    readonly status: number;
    readonly code: string;
    readonly message: string;
}

interface LoginIdExistsData {
    readonly loginId: string;
    readonly exists: boolean;
}

interface LoginIdExistsResponse {
    readonly success: boolean;
    readonly data: LoginIdExistsData;
    readonly error: ApiError | null;
}

interface SignupRequest {
    readonly loginId: string;
    readonly password: string;
    readonly nickname: string;
    readonly agreements: {
        readonly agreementType: string;
        readonly agreementVersion: string;
    }[];
}

interface SignupResponse {
    readonly success: boolean;
    readonly data: null;
    readonly error: ApiError | null;
}

export const signupApi = {
    checkLoginIdExists(loginId: string) {
        const encodedLoginId = encodeURIComponent(loginId);

        return httpClient.get<LoginIdExistsResponse>(
            `/api/v1/members/exists/${encodedLoginId}`,
        );
    },

    signup(payload: SignupRequest) {
        return httpClient.post<SignupResponse>(
            "/api/v1/members/signup",
            payload,
        );
    },
} as const;