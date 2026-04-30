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

export async function existsLoginId(loginId: string): Promise<boolean> {
    const encodedLoginId = encodeURIComponent(loginId);

    const response = await httpClient.get<LoginIdExistsResponse>(
        `/api/v1/members/exists/${encodedLoginId}`,
    );

    if (!response.success) {
        throw new Error(
            response.error?.message || "아이디 중복 확인에 실패했습니다.",
        );
    }

    return response.data.exists;
}