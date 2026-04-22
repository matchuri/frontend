import { clientEnv } from "@/infrastructure/config/env";
import {
    clearAuth,
    getAccessToken,
    setAuthenticated,
} from "@/features/auth/application/store/authStore";

class HttpError extends Error {
    constructor(
        public readonly status: number,
        public readonly statusText: string
    ) {
        super(`[httpClient] ${status} ${statusText}`);
        this.name = "HttpError";
    }
}

// refresh token API
async function refreshAccessToken(): Promise<string> {
    const response = await fetch(`${clientEnv.apiBaseUrl}/api/v1/auth/refresh`, {
        method: "POST",
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Refresh failed");
    }

    const data = await response.json();
    return data.data.accessToken;
}

async function request<T>(
    path: string,
    options?: RequestInit,
    isRetry = false
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

    // 401 처리
    if (response.status === 401 && !isRetry) {
        try {
            console.log("[httpClient] accessToken 만료 → refresh 시도");

            const newToken = await refreshAccessToken();
            setAuthenticated(newToken);
            console.log("[httpClient] 새 accessToken 발급 완료");

            return request<T>(path, options, true);
        } catch (error) {
            console.warn("httpClient] refresh 실패 → 인증 상태 해제", error);
            clearAuth();
            throw new HttpError(401, "Unauthorized");
        }
    }

    // 일반 에러 처리
    if (!response.ok) {
        throw new HttpError(response.status, response.statusText);
    }

    // response 파싱
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