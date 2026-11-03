import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
    title: "비밀번호 변경",
};

export default function SettingPasswordLayout({
    children,
}: {
    children: ReactNode;
}) {
    return <>{children}</>;
}