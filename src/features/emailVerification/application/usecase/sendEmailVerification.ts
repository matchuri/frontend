import { emailVerificationApi } from "@/features/emailVerification/infrastructure/api/emailVerificationApi";
import type { EmailVerificationPurpose } from "@/features/emailVerification/domain/model/EmailVerificationPurpose";

interface SendEmailVerificationParams {
    readonly email: string;
    readonly purpose: EmailVerificationPurpose;
}

type SendEmailVerificationResult =
    | {
        readonly success: true;
        readonly resendAvailableAfterSeconds: number;
    }
    | {
        readonly success: false;
        readonly message: string;
    };

export async function sendEmailVerification({
    email,
    purpose,
}: SendEmailVerificationParams): Promise<SendEmailVerificationResult> {
    try {
        const response = await emailVerificationApi.sendVerificationEmail({
            email,
            purpose,
        });

        if (!response.success) {
            return {
                success: false,
                message: response.error?.message || "인증 코드 발송에 실패했습니다.",
            };
        }

        return {
            success: true,
            resendAvailableAfterSeconds: response.data.resendAvailableAfterSeconds,
        };
    } catch {
        return {
            success: false,
            message: "인증 코드 발송에 실패했습니다.",
        };
    }
}