import { emailVerificationApi } from "@/features/emailVerification/infrastructure/api/emailVerificationApi";
import type { EmailVerificationPurpose } from "@/features/emailVerification/domain/model/EmailVerificationPurpose";

interface ConfirmEmailVerificationParams {
    readonly email: string;
    readonly purpose: EmailVerificationPurpose;
    readonly code: string;
    readonly loginId?: string;
}

type ConfirmEmailVerificationResult =
    | {
        readonly success: true;
        readonly emailVerificationToken: string;
    }
    | {
        readonly success: false;
        readonly message: string;
    };

export async function confirmEmailVerification({
    email,
    purpose,
    code,
    loginId,
}: ConfirmEmailVerificationParams): Promise<ConfirmEmailVerificationResult> {
    try {
        const response = await emailVerificationApi.confirmVerificationEmail({
            email,
            purpose,
            code,
            loginId,
        });

        if (!response.success || !response.data.verified) {
            return {
                success: false,
                message: response.error?.message || "이메일 인증에 실패했습니다.",
            };
        }

        return {
            success: true,
            emailVerificationToken: response.data.emailVerificationToken,
        };
    } catch {
        return {
            success: false,
            message: "이메일 인증에 실패했습니다.",
        };
    }
}