"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/features/auth/application/usecase/logout";

export function useLogout() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false); // 로그아웃 요청이 진행 중인지 상태를 저장

    const handleLogout = useCallback(async () => {
        if (isSubmitting) return;

        setIsSubmitting(true);

        try {
            await logout();
            router.replace("/");
        } finally {
            setIsSubmitting(false);
        }
    }, [isSubmitting, router]);

    return {
        isSubmitting,
        handleLogout,
    };
}