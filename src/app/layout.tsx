import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";

import "./globals.css";
import AppLayout from "@/ui/layout/AppLayout";

const notoSans = Noto_Sans({
    variable: "--font-noto-sans",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    display: "swap",
});

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
        <html lang="ko" className={`${notoSans.variable} h-full antialiased`}>
            <body className="min-h-full flex flex-col">
                <AppLayout>{children}</AppLayout>
            </body>
        </html>
    );
}