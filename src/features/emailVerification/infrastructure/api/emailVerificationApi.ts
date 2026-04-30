import { httpClient } from "@/infrastructure/http/httpClient";

import type { SendEmailVerificationRequest } from "@/features/emailVerification/infrastructure/api/dto/SendEmailVerificationRequest";
import type { SendEmailVerificationResponse } from "@/features/emailVerification/infrastructure/api/dto/SendEmailVerificationResponse";
import type { ConfirmEmailVerificationRequest } from "@/features/emailVerification/infrastructure/api/dto/ConfirmEmailVerificationRequest";
import type { ConfirmEmailVerificationResponse } from "@/features/emailVerification/infrastructure/api/dto/ConfirmEmailVerificationResponse";

export const emailVerificationApi = {
    sendVerificationEmail(payload: SendEmailVerificationRequest) {
        return httpClient.post<SendEmailVerificationResponse>(
            "/api/v1/auth/email",
            payload,
        );
    },

    confirmVerificationEmail(payload: ConfirmEmailVerificationRequest) {
        return httpClient.post<ConfirmEmailVerificationResponse>(
            "/api/v1/auth/email/confirm",
            payload,
        );
    },
} as const;