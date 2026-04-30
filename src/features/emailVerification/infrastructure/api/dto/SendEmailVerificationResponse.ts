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

interface SendEmailVerificationData {
    readonly accepted: boolean;
    readonly resendAvailableAfterSeconds: number;
}

export interface SendEmailVerificationResponse {
    readonly success: boolean;
    readonly data: SendEmailVerificationData;
    readonly error: ApiError | null;
}