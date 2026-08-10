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
        if (isAuthLoading) return;

        if (!isAuthenticated) {
            router.replace(redirectPath);
            return;
        }

        if (!isOnboardingReady) {
            router.replace(redirectPath);
        }
    }, [
        isAuthLoading,
        isAuthenticated,
        isOnboardingReady,
        router,
        redirectPath,
    ]);

    return {
        isAuthenticated,
        isAuthLoading,
        isOnboardingReady,
        canAccess: !isAuthLoading && isAuthenticated && isOnboardingReady,
    };
}