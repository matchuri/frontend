"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAtomValue } from "jotai";

import {
    isAuthenticatedAtom,
    isAuthLoadingAtom,
    isOnboardingReadyAtom,
} from "@/features/auth/application/selectors/authSelectors";

export function useAuthGuard(redirectPath: string = "/login") {
    const router = useRouter();

    const isAuthenticated = useAtomValue(isAuthenticatedAtom);
    const isAuthLoading = useAtomValue(isAuthLoadingAtom);
    const isOnboardingReady = useAtomValue(isOnboardingReadyAtom);

    useEffect(() => {
        // 아직 인증 상태 확인 중이면 아무것도 안 함
        if (isAuthLoading) return;

        // 로그인 안 되어 있으면 리다이렉트
        if (!isAuthenticated) {
            router.replace(redirectPath);
        }

        if (!isOnboardingReady) {
          router.replace(redirectPath);
        }
    }, [
        isAuthLoading,
        isAuthenticated,
        isOnboardingReady,
        router,
        redirectPath
    ]);

    return {
        isAuthenticated,
        isAuthLoading,
        isOnboardingReady,
        canAccess: isAuthenticated && isOnboardingReady,
    };
}