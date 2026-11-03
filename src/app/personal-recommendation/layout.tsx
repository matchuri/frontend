import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
    title: {
        default: "개인 메뉴 추천",
        template: "%s | 맛추리",
    },
    robots: {
        index: false,
        follow: false,
    },
};

export default function PersonalRecommendationLayout({
    children,
}: {
    children: ReactNode;
}) {
    return <>{children}</>;
}