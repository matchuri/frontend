import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
    title: "그룹 메뉴 추천 결과 기록",
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