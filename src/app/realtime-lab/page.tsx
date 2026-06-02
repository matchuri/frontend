"use client";

import { useMemo, useState } from "react";
import { useAtomValue } from "jotai";
import { PlugZap, Trash2, Unplug } from "lucide-react";

import { useAuthGuard } from "@/features/routeGuard/application/hooks/useAuthGuard";
import { accessTokenAtom } from "@/features/auth/application/selectors/authSelectors";
import { useRealtimeEventStream } from "@/features/realtime/application/hooks/useRealtimeEventStream";
import type { RealtimeStreamStatus } from "@/features/realtime/domain/model/RealtimeEvent";

const statusLabels: Record<RealtimeStreamStatus, string> = {
    IDLE: "대기",
    CONNECTING: "연결 중",
    OPEN: "연결됨",
    CLOSED: "닫힘",
    ERROR: "오류",
};

const statusClassNames: Record<RealtimeStreamStatus, string> = {
    IDLE: "border-slate-200 bg-slate-50 text-slate-600",
    CONNECTING: "border-amber-200 bg-amber-50 text-amber-700",
    OPEN: "border-emerald-200 bg-emerald-50 text-emerald-700",
    CLOSED: "border-slate-200 bg-slate-50 text-slate-600",
    ERROR: "border-rose-200 bg-rose-50 text-rose-700",
};

export default function RealtimeLabPage() {
    const { canAccess } = useAuthGuard();
    const accessToken = useAtomValue(accessTokenAtom);
    const [groupId, setGroupId] = useState("");

    const stream = useRealtimeEventStream({ accessToken });

    const groupPath = useMemo(() => {
        const trimmed = groupId.trim();
        return trimmed ? `/api/v1/groups/${trimmed}/realtime/events` : "";
    }, [groupId]);

    if (!canAccess) {
        return null;
    }

    return (
        <main className="min-h-screen bg-slate-50 px-8 py-8 text-slate-900">
            <div className="mx-auto flex max-w-6xl flex-col gap-6">
                <header className="flex flex-col gap-2">
                    <h1 className="text-2xl font-bold">실시간 이벤트 테스트</h1>
                    <p className="text-sm text-slate-500">
                        SSE 연결과 이벤트 payload를 확인합니다.
                    </p>
                </header>

                <section className="grid gap-4 lg:grid-cols-[360px_1fr]">
                    <div className="flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="flex items-center justify-between gap-3">
                            <span className="text-sm font-semibold text-slate-700">
                                연결 상태
                            </span>
                            <span
                                className={[
                                    "rounded-full border px-3 py-1 text-xs font-semibold",
                                    statusClassNames[stream.status],
                                ].join(" ")}
                            >
                                {statusLabels[stream.status]}
                            </span>
                        </div>

                        {stream.errorMessage && (
                            <p className="rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
                                {stream.errorMessage}
                            </p>
                        )}

                        <div className="flex flex-col gap-3">
                            <button
                                type="button"
                                onClick={() =>
                                    stream.connect("/api/v1/realtime/events")
                                }
                                className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:bg-slate-300"
                                disabled={!accessToken}
                            >
                                <PlugZap className="h-4 w-4" />
                                개인 스트림 연결
                            </button>

                            <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
                                그룹 ID
                                <input
                                    value={groupId}
                                    onChange={(event) =>
                                        setGroupId(event.target.value)
                                    }
                                    inputMode="numeric"
                                    placeholder="3001"
                                    className="rounded-md border border-slate-300 px-3 py-2 text-sm font-normal outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </label>

                            <button
                                type="button"
                                onClick={() => stream.connect(groupPath)}
                                className="inline-flex items-center justify-center gap-2 rounded-md bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:bg-slate-300"
                                disabled={!accessToken || !groupPath}
                            >
                                <PlugZap className="h-4 w-4" />
                                그룹 스트림 연결
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <button
                                type="button"
                                onClick={stream.close}
                                className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                            >
                                <Unplug className="h-4 w-4" />
                                닫기
                            </button>

                            <button
                                type="button"
                                onClick={stream.clear}
                                className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                            >
                                <Trash2 className="h-4 w-4" />
                                비우기
                            </button>
                        </div>
                    </div>

                    <div className="min-h-[520px] rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-base font-bold">수신 이벤트</h2>
                            <span className="text-xs font-semibold text-slate-400">
                                최근 {stream.events.length}개
                            </span>
                        </div>

                        {stream.events.length === 0 ? (
                            <div className="flex h-[420px] items-center justify-center rounded-md border border-dashed border-slate-200 text-sm text-slate-400">
                                아직 수신된 이벤트가 없습니다.
                            </div>
                        ) : (
                            <ul className="flex max-h-[620px] flex-col gap-3 overflow-y-auto pr-1">
                                {stream.events.map((item) => (
                                    <li
                                        key={`${item.event.eventId}-${item.receivedAt}`}
                                        className="rounded-md border border-slate-200 bg-slate-50 p-4"
                                    >
                                        <div className="mb-3 flex flex-wrap items-center gap-2">
                                            <span className="rounded bg-blue-50 px-2 py-1 text-xs font-bold text-blue-700">
                                                {item.event.eventType}
                                            </span>
                                            <span className="text-xs text-slate-500">
                                                {new Date(
                                                    item.receivedAt,
                                                ).toLocaleString()}
                                            </span>
                                        </div>

                                        <pre className="max-h-72 overflow-auto whitespace-pre-wrap break-words rounded bg-white p-3 text-xs leading-5 text-slate-700">
                                            {JSON.stringify(item.event, null, 2)}
                                        </pre>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </section>
            </div>
        </main>
    );
}
