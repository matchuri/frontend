import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
    title: "그룹 메뉴 추천: 메뉴 추천 결과",
};

export default function GroupRecommendationResultLayout({
    children,
}: {
    children: ReactNode;
}) {
    return <>{children}</>;
}