"use client";

import { Provider } from "jotai";
import { useAuthInit } from "@/features/auth/application/hooks/useAuthInit";
import Navbar from "@/ui/components/Navbar";

function AppContent({ children }: { children: React.ReactNode }) {
    useAuthInit();

    return (
        <>
            <Navbar />
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