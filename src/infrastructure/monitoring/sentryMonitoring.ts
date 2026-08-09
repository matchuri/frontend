import * as Sentry from "@sentry/nextjs";

interface CaptureApiErrorParams {
    readonly error: unknown;
    readonly path: string;
    readonly method: string;
    readonly status?: number;
    readonly statusText?: string;
    readonly errorCode?: string;
    readonly isRetry?: boolean;
}

function normalizeApiPath(path: string): string {
    return path.replace(/\/\d+(?=\/|$)/g, "/:id");
}

function normalizeError(error: unknown): Error {
    if (error instanceof Error) {
        return error;
    }

    return new Error(String(error));
}

export function captureApiError({
    error,
    path,
    method,
    status,
    statusText,
    errorCode,
    isRetry = false,
}: CaptureApiErrorParams) {
    const normalizedPath = normalizeApiPath(path);

    Sentry.withScope((scope) => {
        scope.setTag("error.type", "api");
        scope.setTag("api.path", normalizedPath);
        scope.setTag("http.method", method);

        if (status !== undefined) {
            scope.setTag(
                "http.status_code",
                String(status),
            );
        }

        if (errorCode) {
            scope.setTag("api.error_code", errorCode);
        }

        scope.setContext("api", {
            path,
            normalizedPath,
            method,
            status,
            statusText,
            errorCode,
            isRetry,
        });

        Sentry.captureException(normalizeError(error));
    });
}