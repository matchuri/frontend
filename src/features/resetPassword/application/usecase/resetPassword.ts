import { resetPasswordApi } from "@/features/resetPassword/infrastructure/api/resetPasswordApi";
import { resetPasswordStorage } from "@/features/resetPassword/infrastructure/storage/resetPasswordStorage";

interface ResetPasswordParams {
    readonly newPassword: string;
    readonly newPasswordConfirm: string;
}

type ResetPasswordResult =
    | { readonly success: true }
    | { readonly success: false; readonly message: string };

export async function resetPassword({
    newPassword,
    newPasswordConfirm,
}: ResetPasswordParams): Promise<ResetPasswordResult> {
    if (!newPassword || !newPasswordConfirm) {
        return {
            success: false,
            message: "새 비밀번호를 입력해주세요.",
        };
    }

    if (newPassword !== newPasswordConfirm) {
        return {
            success: false,
            message: "비밀번호가 일치하지 않습니다.",
        };
    }

    const savedData = resetPasswordStorage.load();

    if (!savedData) {
        return {
            success: false,
            message: "이메일 인증 정보가 없습니다. 다시 인증해주세요.",
        };
    }

    try {
        const response = await resetPasswordApi.resetPassword({
            loginId: savedData.loginId,
            emailVerificationToken: savedData.emailVerificationToken,
            newPassword,
        });

        if (!response.success || !response.data?.reset) {
            return {
                success: false,
                message: response.error?.message || "비밀번호 변경에 실패했습니다.",
            };
        }

        resetPasswordStorage.clear();

        return {
            success: true,
        };
    } catch {
        return {
            success: false,
            message: "비밀번호 변경에 실패했습니다.",
        };
    }
}