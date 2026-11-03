import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
    title: "닉네임 설정",
};

export default function NicknameLayout({
    children,
}: {
    children: ReactNode;
}) {
    return <>{children}</>;
}