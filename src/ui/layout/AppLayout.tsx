"use client";

import { Provider, useAtomValue } from "jotai";
import type { ReactNode } from "react";

import { jotaiStore } from "@/shared/lib/jotaiStore";
import AuthInitializer from "@/features/auth/ui/components/AuthInitializer";
import {
    isAuthenticatedAtom,
    isAuthLoadingAtom,
    isOnboardingReadyAtom,
} from "@/features/auth/application/selectors/authSelectors";

import Navbar from "@/ui/components/Navbar";
import Sidebar from "@/ui/components/Sidebar";

function AppContent({ children }: { children: ReactNode }) {
    const isAuthenticated = useAtomValue(isAuthenticatedAtom);
    const isAuthLoading = useAtomValue(isAuthLoadingAtom);
    const isOnboardingReady = useAtomValue(isOnboardingReadyAtom);

    const showMemberLayout =
      !isAuthLoading && isAuthenticated && isOnboardingReady;

    if (isAuthLoading) {
        return null;
    }

    return (
        <>
            <Navbar />
            {showMemberLayout && <Sidebar />}

            <main
                className={[
                    "h-screen overflow-y-auto",
                    showMemberLayout ? "ml-[280px]" : "",
                ].join(" ")}
            >
            {children}
            </main>
        </>
    );
}

export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Provider store={jotaiStore}>
            <AuthInitializer />
            <AppContent>{children}</AppContent>
        </Provider>
    );
}