import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
    title: "그룹 메뉴 추천: 투표 결과",
};

export default function GroupRecommendationVoteResultLayout({
    children,
}: {
    children: ReactNode;
}) {
    return <>{children}</>;
}