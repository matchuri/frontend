import { clientEnv } from "@/infrastructure/config/env";
import { captureApiError } from "@/infrastructure/monitoring/sentryMonitoring";

import {
    clearAuth,
    getAccessToken,
    setAuthenticated,
} from "@/features/auth/application/store/authStore";

import type { OnboardingState } from "@/features/auth/domain/model/Onboarding";
import type { LoginMember } from "@/features/auth/domain/model/LoginMember";

import { logger } from "@/shared/lib/logger";

interface ErrorResponseBody {
    readonly success?: boolean;

    readonly data?: unknown;

    readonly error?: {
        readonly status?: number;
        readonly code?: string;
        readonly message?: string;
        readonly details?: readonly unknown[];
    } | null;
}

class HttpError extends Error {
    constructor(
        public readonly status: number,
        public readonly statusText: string,
        public readonly body?: ErrorResponseBody,
    ) {
        super(`[httpClient] ${status} ${statusText}`);

        this.name = "HttpError";
    }
}

interface RefreshResult {
    readonly accessToken: string;
    readonly onboarding: OnboardingState;
    readonly member: LoginMember;
}

interface RefreshResponseBody {
    readonly data: RefreshResult;
}

const REFRESH_PATH = "/api/v1/auth/refresh";

const NO_REFRESH_PATHS = [
    "/api/v1/auth/oauth2/exchange",
    "/api/v1/auth/login",
    REFRESH_PATH,
    "/api/v1/members/signup",
    "/api/v1/auth/email",
    "/api/v1/auth/email/confirm",
];

const SILENT_ERROR_LOG_PATHS = [
    REFRESH_PATH,
    "/api/v1/auth/email/confirm",
    "/api/v1/groups/invites/nickname",
];

const SILENT_ERROR_CODES = [
    "GROUP_NOT_FOUND",
    "MEMBER_LOCATION_NOT_FOUND",
];

const MONITORED_CLIENT_ERROR_STATUSES = [
    408,
    429,
];

let refreshRequestPromise: Promise<unknown> | null = null;

function shouldTryRefresh(path: string, isRetry: boolean) {
    if (isRetry) {
        return false;
    }

    if (NO_REFRESH_PATHS.includes(path)) {
        return false;
    }

    return true;
}

function shouldSilenceErrorLog(
    path: string,
    errorBody: ErrorResponseBody | null,
) {
    if (SILENT_ERROR_LOG_PATHS.includes(path)) {
        return true;
    }

    const errorCode = errorBody?.error?.code;

    if (errorCode && SILENT_ERROR_CODES.includes(errorCode)) {
        return true;
    }

    return false;
}

function shouldCaptureApiError(
    path: string,
    status: number,
    errorBody: ErrorResponseBody | null,
) {
    if (shouldSilenceErrorLog(path, errorBody)) {
        return false;
    }

    if (status >= 500) {
        return true;
    }

    return MONITORED_CLIENT_ERROR_STATUSES.includes(status);
}

async function refreshAccessToken(): Promise<RefreshResult> {
    const response = await request<RefreshResponseBody>(
        REFRESH_PATH,
        {
            method: "POST",
        },
    );

    return response.data;
}

async function requestRefresh<T>(
    options?: RequestInit,
    isRetry = false,
): Promise<T> {
    if (refreshRequestPromise) {
        return refreshRequestPromise as Promise<T>;
    }

    const currentRequest = executeRequest<T>(
        REFRESH_PATH,
        options,
        isRetry,
    );

    refreshRequestPromise = currentRequest;

    try {
        return await currentRequest;
    } finally {
        if (refreshRequestPromise === currentRequest) {
            refreshRequestPromise = null;
        }
    }
}

async function request<T>(
    path: string,
    options?: RequestInit,
    isRetry = false,
): Promise<T> {
    const method = options?.method ?? "GET";

    if (path === REFRESH_PATH && method === "POST") {
        return requestRefresh<T>(options, isRetry);
    }

    return executeRequest<T>(path, options, isRetry);
}

async function executeRequest<T>(
    path: string,
    options?: RequestInit,
    isRetry = false,
): Promise<T> {
    const accessToken = getAccessToken();
    const method = options?.method ?? "GET";

    let response: Response;

    try {
        response = await fetch(
            `${clientEnv.apiBaseUrl}${path}`,
            {
                ...options,
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    ...(accessToken && {
                        Authorization: `Bearer ${accessToken}`,
                    }),
                    ...options?.headers,
                },
            },
        );
    } catch (error) {
        captureApiError({
            error,
            path,
            method,
            isRetry,
        });

        throw error;
    }

    if (
        response.status === 401 &&
        shouldTryRefresh(path, isRetry)
    ) {
        try {
            const refreshed = await refreshAccessToken();

            setAuthenticated(
                refreshed.accessToken,
                refreshed.onboarding,
                refreshed.member,
            );

            return request<T>(path, options, true);
        } catch (error) {
            logger.warn(
                "[httpClient] refresh 실패 → 인증 상태 해제",
                error,
            );

            clearAuth();

            throw new HttpError(401, "Unauthorized");
        }
    }

    if (!response.ok) {
        const errorBody: ErrorResponseBody | null =
            await response.json().catch(() => null);

        if (!shouldSilenceErrorLog(path, errorBody)) {
            logger.error("[httpClient] 요청 실패 응답:", {
                path,
                status: response.status,
                statusText: response.statusText,
                body: errorBody,
            });
        }

        const httpError = new HttpError(
            response.status,
            response.statusText,
            errorBody ?? undefined,
        );

        if (
            shouldCaptureApiError(
                path,
                response.status,
                errorBody,
            )
        ) {
            captureApiError({
                error: httpError,
                path,
                method,
                status: response.status,
                statusText: response.statusText,
                errorCode: errorBody?.error?.code,
                isRetry,
            });
        }

        throw httpError;
    }

    const text = await response.text();

    return text
        ? JSON.parse(text)
        : (undefined as T);
}

export const httpClient = {
    get<T>(path: string): Promise<T> {
        return request<T>(path, { method: "GET" });
    },

    post<T>(path: string, body?: unknown): Promise<T> {
        return request<T>(path, {
            method: "POST",
            body:
                body !== undefined
                    ? JSON.stringify(body)
                    : undefined,
        });
    },

    put<T>(path: string, body?: unknown): Promise<T> {
        return request<T>(path, {
            method: "PUT",
            body:
                body !== undefined
                    ? JSON.stringify(body)
                    : undefined,
        });
    },

    patch<T>(path: string, body?: unknown): Promise<T> {
        return request<T>(path, {
            method: "PATCH",
            body:
                body !== undefined
                    ? JSON.stringify(body)
                    : undefined,
        });
    },

    delete<T>(path: string): Promise<T> {
        return request<T>(path, {
            method: "DELETE",
        });
    },
};

export { HttpError };