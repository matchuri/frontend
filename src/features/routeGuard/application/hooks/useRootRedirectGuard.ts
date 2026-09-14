"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAtomValue } from "jotai";

import {
    isAuthLoadingAtom,
    isAuthenticatedAtom,
    onboardingAtom,
} from "@/features/auth/application/selectors/authSelectors";
import { getOnboardingRoute } from "@/features/auth/application/onboarding/getOnboardingRoute";

export function useRootRedirectGuard() {
    const router = useRouter();

    const isAuthLoading = useAtomValue(isAuthLoadingAtom);
    const isAuthenticated = useAtomValue(isAuthenticatedAtom);
    const onboarding = useAtomValue(onboardingAtom);

    useEffect(() => {
        if (isAuthLoading) return;

        if (!isAuthenticated) return;

        if (!onboarding) return;

        router.replace(getOnboardingRoute(onboarding.nextStep));
    }, [
        isAuthLoading,
        isAuthenticated,
        onboarding,
        router,
    ]);

    return {
        isAuthLoading,
        isAuthenticated,
        onboarding,
        shouldShowPublicHome: !isAuthLoading && !isAuthenticated,
    };
}