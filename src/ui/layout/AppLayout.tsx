"use client";

import { Provider, useAtomValue } from "jotai";
import type { ReactNode } from "react";

import { jotaiStore } from "@/shared/lib/jotaiStore";
import AuthInitializer from "@/features/auth/ui/components/AuthInitializer";
import {
    isAuthenticatedAtom,
    isAuthLoadingAtom,
} from "@/features/auth/application/selectors/authSelectors";

import Navbar from "@/ui/components/Navbar";
import Sidebar from "@/ui/components/Sidebar";

function AppContent({ children }: { children: ReactNode }) {
    const isAuthenticated = useAtomValue(isAuthenticatedAtom);
    const isAuthLoading = useAtomValue(isAuthLoadingAtom);

    return (
        <>
            <Navbar />
            {!isAuthLoading && isAuthenticated && <Sidebar />}

            <main
                className={[
                    "h-screen overflow-y-auto",
                    !isAuthLoading && isAuthenticated ? "ml-[280px]" : "",
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