import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
    title: {
        default: "그룹 상세",
        template: "%s | 맛추리",
    },
    robots: {
        index: false,
        follow: false,
    },
};

export default function GroupLayout({
    children,
}: {
    children: ReactNode;
}) {
    return <>{children}</>;
}