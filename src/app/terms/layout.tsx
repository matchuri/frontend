import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
    title: {
        default: "약관 동의",
        template: "%s | 맛추리",
    },
    robots: {
        index: false,
        follow: false,
    },
};

export default function TermsLayout({
    children,
}: {
    children: ReactNode;
}) {
    return <>{children}</>;
}