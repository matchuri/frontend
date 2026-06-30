interface ApiErrorDetail {
    readonly source: string;
    readonly field: string;
    readonly reason: string;
}

interface ApiError {
    readonly status: number;
    readonly code: string;
    readonly message: string;
    readonly details?: ApiErrorDetail[];
}

interface ConfirmEmailVerificationData {
    readonly verified: boolean;
    readonly emailVerificationToken: string;
    readonly expiresIn: number;
}

export interface ConfirmEmailVerificationResponse {
    readonly success: boolean;
    readonly data: ConfirmEmailVerificationData;
    readonly error: ApiError | null;
}