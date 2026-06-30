import type { EmailVerificationPurpose } from "@/features/emailVerification/domain/model/EmailVerificationPurpose";

export interface SendEmailVerificationRequest {
    readonly email: string;
    readonly purpose: EmailVerificationPurpose;
    readonly loginId?: string;
}