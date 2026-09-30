import type { Metadata } from "next";

import "./globals.css";
import AppLayout from "@/ui/layout/AppLayout";

export const metadata: Metadata = {
    title: "matchuri-frontend",
    description: "matchuri-frontend",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko" className="h-full antialiased">
            <body className="min-h-full flex flex-col">
                <AppLayout>{children}</AppLayout>
            </body>
        </html>
    );
}
