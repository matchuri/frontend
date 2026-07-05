"use client";

import Link from "next/link";
import { House } from "lucide-react";

export default function HomeNavigationButton() {
    return (
        <Link
            href="/"
            className="absolute left-10 top-10 flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-slate-900"
        >
            <House className="h-4 w-4" />
            홈으로 가기
        </Link>
    );
}