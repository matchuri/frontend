export interface ResetPasswordRequest {
    readonly loginId: string;
    readonly emailVerificationToken: string;
    readonly newPassword: string;
}