import type { Metadata } from "next";
import type { ReactNode } from "react";

const title = "메뉴 추천 | 맛추리";
const description =
    "회원가입 없이 취향과 위치를 설정하고 오늘 먹기 좋은 메뉴를 추천받아보세요.";

export const metadata: Metadata = {
    title: {
        default: "메뉴 추천 설정",
        template: "%s | 맛추리",
    },
    description,
    alternates: {
        canonical: "/guest-recommendation",
    },
    robots: {
        index: true,
        follow: true,
    },
    openGraph: {
        title,
        description,
        url: "/guest-recommendation",
        siteName: "맛추리",
        images: [
            {
                url: "/images/og-image.png",
                width: 1200,
                height: 630,
                alt: "맛추리 서비스 로고",
            },
        ],
        locale: "ko_KR",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title,
        description,
        images: ["/images/og-image.png"],
    },
};

export default function GuestRecommendationLayout({
    children,
}: {
    children: ReactNode;
}) {
    return <>{children}</>;
}