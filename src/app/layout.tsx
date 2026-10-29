import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";

import "./globals.css";
import AppLayout from "@/ui/layout/AppLayout";

const notoSans = Noto_Sans({
    variable: "--font-noto-sans",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    display: "swap",
    preload: false,
});

export const metadata: Metadata = {
    metadataBase: new URL("https://www.matchuri.com"),
    applicationName: "맛추리",
    title: {
        default: "맛추리 | 취향 기반 메뉴 추천",
        template: "%s | 맛추리",
    },
    description:
        "취향과 위치를 바탕으로 오늘 먹기 좋은 메뉴를 추천하고 주변 맛집까지 찾아보세요.",
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