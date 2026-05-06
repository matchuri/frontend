interface ApiErrorDetail {
    readonly source: string;
    readonly field: string;
    readonly reason: string;
}

interface ApiError {
    readonly status: number;
    readonly code: string;
    readonly message: string;
    readonly details?: readonly ApiErrorDetail[];
}

interface ResetPasswordData {
    readonly reset: boolean;
}

export interface ResetPasswordResponse {
    readonly success: boolean;
    readonly data: ResetPasswordData | null;
    readonly error: ApiError | null;
}