import { sendEmailVerification } from "@/features/emailVerification/application/usecase/sendEmailVerification";

interface RequestPasswordVerificationParams {
    readonly loginId: string;
    readonly email: string;
}

type RequestPasswordVerificationResult =
    | { readonly success: true }
    | { readonly success: false; readonly message: string };

export async function requestPasswordVerification({
    loginId,
    email,
}: RequestPasswordVerificationParams): Promise<RequestPasswordVerificationResult> {
    if (!loginId.trim() || !email.trim()) {
        return {
            success: false,
            message: "아이디와 이메일을 입력해주세요.",
        };
    }

    const result = await sendEmailVerification({
        email: email.trim(),
        loginId: loginId.trim(),
        purpose: "RESET_PASSWORD",
    });

    if (!result.success) {
        return result;
    }

    return {
        success: true,
    };
}