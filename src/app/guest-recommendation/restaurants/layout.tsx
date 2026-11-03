import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
    title: "주변 맛집",
    alternates: {
        canonical: "/guest-recommendation/restaurants",
    },
    robots: {
        index: false,
        follow: false,
    },
};

export default function GuestRecommendationRestaurantsLayout({
    children,
}: {
    children: ReactNode;
}) {
    return <>{children}</>;
}