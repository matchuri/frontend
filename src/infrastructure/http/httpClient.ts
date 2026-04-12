import { clientEnv } from "@/infrastructure/config/env";

class HttpError extends Error {
    constructor(
        public readonly status: number,
        public readonly statusText: string
    ) {
        super(`[httpClient] ${status} ${statusText}`);
        this.name = "HttpError";
    }
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
    const response = await fetch(
        `${clientEnv.apiBaseUrl}${path}`,
        {
            ...options,
            credentials: "include", // refresh token 쿠키 포함
            headers: {
                "Content-Type": "application/json",
                ...options?.headers,
            },
        }
    );

    if (!response.ok) {
        throw new HttpError(response.status, response.statusText);
    }

    const text = await response.text();

    // 응답 body 없는 경우 대응
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
} as const;

export { HttpError };