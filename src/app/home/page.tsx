"use client";

import { useEffect } from "react";
import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
import {
    isAuthenticatedAtom,
    isAuthLoadingAtom,
} from "@/features/auth/application/selectors/authSelectors";

export default function HomePage() {
    const router = useRouter();
    const isAuthenticated = useAtomValue(isAuthenticatedAtom);
    const isAuthLoading = useAtomValue(isAuthLoadingAtom);

    useEffect(() => {
        if (!isAuthLoading && !isAuthenticated) {
            router.replace("/login");
        }
    }, [isAuthLoading, isAuthenticated, router]);

    if (isAuthLoading || !isAuthenticated) {
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