"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAtomValue } from "jotai";

import {
    isAuthLoadingAtom,
    isAuthenticatedAtom,
    onboardingAtom,
} from "@/features/auth/application/selectors/authSelectors";

export function useRootRedirectGuard() {
    const router = useRouter();

    const isAuthLoading = useAtomValue(isAuthLoadingAtom);
    const isAuthenticated = useAtomValue(isAuthenticatedAtom);
    const onboarding = useAtomValue(onboardingAtom);

    useEffect(() => {
        if (isAuthLoading) return;

        if (!isAuthenticated) return;

        if (!onboarding) return;

        if (onboarding.nextStep === "REQUIRED_AGREEMENTS") {
            router.replace("/terms");
            return;
        }

        if (onboarding.nextStep === "REQUIRED_NICKNAME") {
            router.replace("/signup/nickname");
            return;
        }

        if (onboarding.nextStep === "READY") {
            router.replace("/home");
            return;
        }
    }, [isAuthLoading, isAuthenticated, onboarding, router]);

    return {
        isAuthLoading,
        isAuthenticated,
        onboarding,
        shouldShowPublicHome: !isAuthLoading && !isAuthenticated,
    };
}