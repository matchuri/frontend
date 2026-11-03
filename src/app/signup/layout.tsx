import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
    title: {
        default: "회원가입",
        template: "%s | 맛추리",
    },
    robots: {
        index: false,
        follow: false,
    },
};

export default function SignupLayout({
    children,
}: {
    children: ReactNode;
}) {
    return <>{children}</>;
}