"use client";

import { useRootRedirectGuard } from "@/features/routeGuard/application/hooks/useRootRedirectGuard";

export default function Home() {
    const { shouldShowPublicHome } = useRootRedirectGuard();

    if (!shouldShowPublicHome) {
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