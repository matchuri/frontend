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

interface CaptureSseErrorParams {
    readonly stream: string;
    readonly eventType: "connection_failed" | "disconnected";
    readonly readyState: number;
    readonly groupId?: number;
}

interface CaptureExternalSdkErrorParams {
    readonly error: unknown;
    readonly sdk: string;
    readonly operation: string;
    readonly status?: string;
    readonly context?: Record<string, unknown>;
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

function getSseReadyStateName(readyState: number): string {
    switch (readyState) {
        case 0:
            return "connecting";

        case 1:
            return "open";

        case 2:
            return "closed";

        default:
            return "unknown";
    }
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

export function captureSseError({
    stream,
    eventType,
    readyState,
    groupId,
}: CaptureSseErrorParams) {
    const readyStateName =
        getSseReadyStateName(readyState);

    Sentry.withScope((scope) => {
        scope.setTag("error.type", "sse");
        scope.setTag("sse.stream", stream);
        scope.setTag("sse.event_type", eventType);
        scope.setTag(
            "sse.ready_state",
            readyStateName,
        );

        scope.setContext("sse", {
            stream,
            eventType,
            readyState,
            readyStateName,
            groupId,
        });

        Sentry.captureException(
            new Error(
                eventType === "connection_failed"
                    ? "Group SSE connection failed"
                    : "Group SSE disconnected unexpectedly",
            ),
        );
    });
}

export function captureExternalSdkError({
    error,
    sdk,
    operation,
    status,
    context,
}: CaptureExternalSdkErrorParams) {
    Sentry.withScope((scope) => {
        scope.setTag("error.type", "external_sdk");
        scope.setTag("sdk", sdk);
        scope.setTag("sdk.operation", operation);

        if (status) {
            scope.setTag("sdk.status", status);
        }

        scope.setContext("externalSdk", {
            sdk,
            operation,
            status,
            ...context,
        });

        Sentry.captureException(normalizeError(error));
    });
}