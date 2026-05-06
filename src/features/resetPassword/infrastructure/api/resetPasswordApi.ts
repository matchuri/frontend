import { httpClient } from "@/infrastructure/http/httpClient";
import type { ResetPasswordRequest } from "@/features/resetPassword/infrastructure/api/dto/ResetPasswordRequest";
import type { ResetPasswordResponse } from "@/features/resetPassword/infrastructure/api/dto/ResetPasswordResponse";

export const resetPasswordApi = {
    resetPassword(payload: ResetPasswordRequest) {
        return httpClient.post<ResetPasswordResponse>(
            "/api/v1/auth/recovery/password",
            payload,
        );
    },
} as const;