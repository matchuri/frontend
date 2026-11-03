import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
    title: "메뉴 추천 결과",
    alternates: {
        canonical: "/guest-recommendation/result",
    },
    robots: {
        index: false,
        follow: false,
    },
};

export default function GuestRecommendationResultLayout({
    children,
}: {
    children: ReactNode;
}) {
    return <>{children}</>;
}