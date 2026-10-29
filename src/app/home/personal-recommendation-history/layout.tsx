import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
    title: "지난 메뉴 추천 기록",
    robots: {
        index: false,
        follow: false,
    },
};

export default function PersonalRecommendationHistoryLayout({
    children,
}: {
    children: ReactNode;
}) {
    return <>{children}</>;
}