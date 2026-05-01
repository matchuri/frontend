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
    readonly email: string;
    readonly emailVerificationToken: string;
    readonly agreements: {
        readonly agreementType: string;
        readonly agreementVersion: string;
    }[];
}

interface SignupData {
    readonly memberId: number;
    readonly loginId: string;
    readonly email: string;
    readonly nickname: string;
    readonly createdAt: string;
}

interface SignupResponse {
    readonly success: boolean;
    readonly data: SignupData;
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