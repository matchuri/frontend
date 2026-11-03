import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
    title: "개인 메뉴 추천: 주변 맛집",
    robots: {
        index: false,
        follow: false,
    },
};

export default function RecommendationRestaurantsLayout({
    children,
}: {
    children: ReactNode;
}) {
    return <>{children}</>;
}