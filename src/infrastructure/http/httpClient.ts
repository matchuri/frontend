import { clientEnv } from "@/infrastructure/config/env";
import {
    getAccessToken,
    setAuthenticated,
    clearAuth,
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

// refresh API 호출 (쿠키 기반)
async function refreshAccessToken(): Promise<string> {
    const response = await fetch(
        `${clientEnv.apiBaseUrl}/api/v1/auth/refresh`,
        {
            method: "POST",
            credentials: "include", // 쿠키 포함
        }
    );

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

    const response = await fetch(
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
        }
    );

    if (response.status === 401 && !isRetry) {
        try {
            console.log("accessToken 만료 → refresh 시도");

            const newToken = await refreshAccessToken();
            // 상태 업데이트
            setAuthenticated(newToken);

            console.log("새 accessToken 발급 완료");
            return request<T>(path, options, true);

        } catch (error) {
            console.error("refresh 실패 → 로그아웃", error);
            clearAuth();

            throw new HttpError(401, "Unauthorized");
        }
    }

    if (!response.ok) {
        throw new HttpError(response.status, response.statusText);
    }

    const text = await response.text();

    if (!text) {
        return undefined as T;
    }

    return JSON.parse(text) as T;
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