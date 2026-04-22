"use client";

import { useEffect } from "react";
import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
import {
    isAuthenticatedAtom,
    isAuthLoadingAtom,
} from "@/features/auth/application/selectors/authSelectors";

export default function Home() {
    const router = useRouter();
    const isAuthenticated = useAtomValue(isAuthenticatedAtom);
    const isAuthLoading = useAtomValue(isAuthLoadingAtom);

    useEffect(() => {
        if (!isAuthLoading && isAuthenticated) {
        router.replace("/home");
        }
    }, [isAuthLoading, isAuthenticated, router]);

    if (isAuthLoading || isAuthenticated) {
        return null;
    }

    return (
        <main className="flex items-center justify-center min-h-screen bg-blue-500">
            <h1 className="text-3xl font-bold text-white">
                메인 페이지(비로그인)
            </h1>
        </main>
    );
}