import type { Metadata } from "next";

import PublicHomePage from "@/features/home/ui/components/PublicHomePage";

const title = "맛추리 | 취향 기반 메뉴 추천";
const description =
    "취향과 위치를 바탕으로 오늘 먹기 좋은 메뉴를 추천하고 주변 맛집까지 찾아보세요.";

export const metadata: Metadata = {
    alternates: {
        canonical: "/",
    },
    robots: {
        index: true,
        follow: true,
    },
    openGraph: {
        title,
        description,
        url: "/",
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

export default function Home() {
    return <PublicHomePage />;
}