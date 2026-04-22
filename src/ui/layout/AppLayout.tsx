"use client";

import { Provider, useAtomValue } from "jotai";
import { useAuthInit } from "@/features/auth/application/hooks/useAuthInit";
import { authAtom } from "@/features/auth/application/atom/authAtom";

import Navbar from "@/ui/components/Navbar";
import Sidebar from "@/ui/components/Sidebar";

function AppContent({ children }: { children: React.ReactNode }) {
    useAuthInit();

    const auth = useAtomValue(authAtom);
    const isAuth = auth.status === "AUTHENTICATED";

    return (
        <>
            <Navbar />
            {isAuth && <Sidebar />}
            <main
                className={[
                    "h-screen overflow-y-auto",
                    isAuth ? "ml-[280px]" : "",
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
        <Provider>
            <AppContent>{children}</AppContent>
        </Provider>
    );
}