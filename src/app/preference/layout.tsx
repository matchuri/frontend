import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
    title: "취향 프로필 설정",
    robots: {
        index: false,
        follow: false,
    },
};

export default function PreferenceLayout({
    children,
}: {
    children: ReactNode;
}) {
    return <>{children}</>;
}