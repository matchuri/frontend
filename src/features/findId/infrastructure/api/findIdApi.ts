import { httpClient } from "@/infrastructure/http/httpClient";
import type { FindIdRequest } from "@/features/findId/infrastructure/api/dto/FindIdRequest";
import type { FindIdResponseData } from "@/features/findId/infrastructure/api/dto/FindIdResponseData";

interface ApiErrorDetail {
    readonly source: string;
    readonly field: string;
    readonly reason: string;
}

interface ApiError {
    readonly status: number;
    readonly code: string;
    readonly message: string;
    readonly details: readonly ApiErrorDetail[];
}

interface FindIdResponse {
    readonly success: boolean;
    readonly data: FindIdResponseData | null;
    readonly error: ApiError | null;
}

export const findIdApi = {
    findId(payload: FindIdRequest) {
        return httpClient.post<FindIdResponse>(
            "/api/v1/auth/recovery/login-id",
            payload,
        );
    },
} as const;