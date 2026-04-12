"use client";

import { Provider } from "jotai";
import { useAuthInit } from "@/features/auth/application/hooks/useAuthInit";

function AppContent({ children }: { children: React.ReactNode }) {
    useAuthInit();

    return (
        <>
            {/* TODO: 나중에 Navbar 추가 가능 */}
            <main>{children}</main>
        </>
    );
}

export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Provider>
            <AppContent>{children}</AppContent>
        </Provider>
    );
}