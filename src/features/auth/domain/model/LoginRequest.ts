export interface LoginRequest {
    readonly loginId: string;
    readonly password: string;
    readonly recaptchaToken: string;
}