import { clientEnv } from "@/infrastructure/config/env";
import {
    clearAuth,
    getAccessToken,
    setAuthenticated,
} from "@/features/auth/application/store/authStore";
import type { OnboardingState } from "@/features/auth/domain/model/Onboarding";
import type { LoginMember } from "@/features/auth/domain/model/LoginMember";

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
    accessToken: string;
    onboarding: OnboardingState;
    member: LoginMember;
}

const NO_REFRESH_PATHS = [
    "/api/v1/auth/oauth2/exchange",
    "/api/v1/auth/login",
    "/api/v1/auth/refresh",
    "/api/v1/members/signup",
    "/api/v1/auth/email",
    "/api/v1/auth/email/confirm",
];

const SILENT_ERROR_LOG_PATHS = [
    "/api/v1/auth/refresh",
    "/api/v1/auth/email/confirm",
    "/api/v1/groups/invites/nickname",
];

function shouldTryRefresh(path: string, isRetry: boolean) {
    if (isRetry) return false;
    if (NO_REFRESH_PATHS.includes(path)) return false;

    return true;
}

async function refreshAccessToken(): Promise<RefreshResult> {
    const response = await fetch(`${clientEnv.apiBaseUrl}/api/v1/auth/refresh`, {
        method: "POST",
        credentials: "include",
    });

    if (!response.ok) {
        const errorBody = await response.json().catch(() => null);

        console.error("[httpClient] refresh 실패 응답:", {
            status: response.status,
            statusText: response.statusText,
            body: errorBody,
        });

        throw new Error("Refresh failed");
    }

    const body = await response.json();

    return {
        accessToken: body.data.accessToken,
        onboarding: body.data.onboarding,
        member: body.data.member,
    };
}

async function request<T>(
    path: string,
    options?: RequestInit,
    isRetry = false,
): Promise<T> {
    const accessToken = getAccessToken();

    const response = await fetch(`${clientEnv.apiBaseUrl}${path}`, {
        ...options,
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            ...(accessToken && {
                Authorization: `Bearer ${accessToken}`,
            }),
            ...options?.headers,
        },
    });

    if (response.status === 401 && shouldTryRefresh(path, isRetry)) {
        try {
            const refreshed = await refreshAccessToken();

            setAuthenticated(refreshed.accessToken, refreshed.onboarding, refreshed.member,);

            return request<T>(path, options, true);
        } catch (error) {
            console.warn("[httpClient] refresh 실패 → 인증 상태 해제", error);
            clearAuth();
            throw new HttpError(401, "Unauthorized");
        }
    }

    if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        //  refresh는 로그 안 찍음
        if (!SILENT_ERROR_LOG_PATHS.includes(path)) {
            console.error("[httpClient] 요청 실패 응답:", {
                path,
                status: response.status,
                statusText: response.statusText,
                body: errorBody,
            });
        }
        throw new HttpError(response.status, response.statusText, errorBody,);
    }

    const text = await response.text();
    return text ? JSON.parse(text) : (undefined as T);
}

export const httpClient = {
    get<T>(path: string): Promise<T> {
        return request<T>(path, { method: "GET" });
    },

    post<T>(path: string, body?: unknown): Promise<T> {
        return request<T>(path, {
            method: "POST",
            body: body ? JSON.stringify(body) : undefined,
        });
    },

    put<T>(path: string, body?: unknown): Promise<T> {
        return request<T>(path, {
            method: "PUT",
            body: body ? JSON.stringify(body) : undefined,
        });
    },

    patch<T>(path: string, body?: unknown): Promise<T> {
        return request<T>(path, {
            method: "PATCH",
            body: body ? JSON.stringify(body) : undefined,
        });
    },

    delete<T>(path: string): Promise<T> {
        return request<T>(path, { method: "DELETE" });
    },
};

export { HttpError };