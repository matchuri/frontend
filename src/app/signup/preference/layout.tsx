import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
    title: "취향 설정",
};

export default function SignupPreferenceLayout({
    children,
}: {
    children: ReactNode;
}) {
    return <>{children}</>;
}