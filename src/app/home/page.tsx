"use client";

import { useAtomValue } from "jotai";
import { authAtom } from "@/features/auth/application/atom/authAtom";

export default function HomePage() {
    const auth = useAtomValue(authAtom);

    if (auth.status !== "AUTHENTICATED") {
        return null;
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-green-500">
            <h1 className="text-3xl font-bold text-white">
                회원 전용 메인 페이지
            </h1>
        </main>
    );
}