import { clientEnv } from "@/infrastructure/config/env";
import type {
    RealtimeEventEnvelope,
    RealtimeStreamMessage,
} from "@/features/realtime/domain/model/RealtimeEvent";

interface ConnectRealtimeStreamOptions {
    path: string;
    accessToken: string;
    onOpen?: () => void;
    onEvent: (event: RealtimeEventEnvelope, raw: RealtimeStreamMessage) => void;
    onError?: (error: unknown) => void;
    onClose?: () => void;
}

export interface RealtimeStreamConnection {
    close: () => void;
}

export function connectRealtimeStream(
    options: ConnectRealtimeStreamOptions,
): RealtimeStreamConnection {
    const abortController = new AbortController();
    void readRealtimeStream(options, abortController);

    return {
        close: () => abortController.abort(),
    };
}

async function readRealtimeStream(
    options: ConnectRealtimeStreamOptions,
    abortController: AbortController,
) {
    try {
        const response = await fetch(`${clientEnv.apiBaseUrl}${options.path}`, {
            method: "GET",
            headers: {
                Accept: "text/event-stream",
                Authorization: `Bearer ${options.accessToken}`,
            },
            credentials: "include",
            signal: abortController.signal,
        });

        if (!response.ok) {
            throw new Error(`SSE connection failed: ${response.status}`);
        }

        if (!response.body) {
            throw new Error("SSE response body is empty");
        }

        options.onOpen?.();
        await readChunks(response.body, options);
        options.onClose?.();
    } catch (error) {
        if (abortController.signal.aborted) {
            options.onClose?.();
            return;
        }

        options.onError?.(error);
    }
}

async function readChunks(
    body: ReadableStream<Uint8Array>,
    options: ConnectRealtimeStreamOptions,
) {
    const reader = body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
        const { done, value } = await reader.read();

        if (done) {
            if (buffer.length > 0) {
                dispatchFrame(buffer, options);
            }
            break;
        }

        buffer += decoder.decode(value, { stream: true });
        const frames = buffer.split(/\r?\n\r?\n/);
        buffer = frames.pop() ?? "";

        frames.forEach((frame) => dispatchFrame(frame, options));
    }
}

function dispatchFrame(
    frame: string,
    options: ConnectRealtimeStreamOptions,
) {
    const message = parseSseFrame(frame);

    if (!message || message.data.length === 0) {
        return;
    }

    const event = JSON.parse(message.data) as RealtimeEventEnvelope;
    options.onEvent(event, message);
}

function parseSseFrame(frame: string): RealtimeStreamMessage | null {
    const lines = frame.split(/\r?\n/);
    let id: string | null = null;
    let event: string | null = null;
    const dataLines: string[] = [];

    lines.forEach((line) => {
        if (line.length === 0 || line.startsWith(":")) {
            return;
        }

        const separatorIndex = line.indexOf(":");
        const field = separatorIndex >= 0 ? line.slice(0, separatorIndex) : line;
        const rawValue = separatorIndex >= 0 ? line.slice(separatorIndex + 1) : "";
        const value = rawValue.startsWith(" ") ? rawValue.slice(1) : rawValue;

        if (field === "id") {
            id = value;
        }

        if (field === "event") {
            event = value;
        }

        if (field === "data") {
            dataLines.push(value);
        }
    });

    if (!id && !event && dataLines.length === 0) {
        return null;
    }

    return {
        id,
        event,
        data: dataLines.join("\n"),
    };
}
