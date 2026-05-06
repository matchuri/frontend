import { confirmEmailVerification } from "@/features/emailVerification/application/usecase/confirmEmailVerification";
import { resetPasswordStorage } from "@/features/resetPassword/infrastructure/storage/resetPasswordStorage";

interface ConfirmPasswordVerificationParams {
    readonly loginId: string;
    readonly email: string;
    readonly code: string;
}

type ConfirmPasswordVerificationResult =
    | { readonly success: true; readonly emailVerificationToken: string }
    | { readonly success: false; readonly message: string };

export async function confirmPasswordVerification({
    loginId,
    email,
    code,
}: ConfirmPasswordVerificationParams): Promise<ConfirmPasswordVerificationResult> {
    if (!code.trim()) {
        return {
            success: false,
            message: "인증 코드를 입력해주세요.",
        };
    }

    const result = await confirmEmailVerification({
        email: email.trim(),
        loginId: loginId.trim(),
        code: code.trim(),
        purpose: "RESET_PASSWORD",
    });

    if (!result.success) {
        return result;
    }

    resetPasswordStorage.save({
        loginId: loginId.trim(),
        email: email.trim(),
        emailVerificationToken: result.emailVerificationToken,
    });

    return result;
}