export interface LoginRequest {
    readonly loginId: string;
    readonly password: string;
    readonly captchaToken: string;
}