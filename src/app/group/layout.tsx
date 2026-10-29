import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
    title: {
        default: "그룹 관리",
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