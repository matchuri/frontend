import type { EmailVerificationPurpose } from "@/features/emailVerification/domain/model/EmailVerificationPurpose";

export interface ConfirmEmailVerificationRequest {
    readonly email: string;
    readonly purpose: EmailVerificationPurpose;
    readonly code: string;
    readonly loginId?: string;
}