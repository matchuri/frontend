"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAtomValue } from "jotai";

import {
    isAuthLoadingAtom,
    isAuthenticatedAtom,
    onboardingAtom,
} from "@/features/auth/application/selectors/authSelectors";

import { signupOnboardingModeStorage } from "@/features/signup/infrastructure/storage/signupOnboardingModeStorage";

export function useRootRedirectGuard() {
    const router = useRouter();

    const isAuthLoading = useAtomValue(isAuthLoadingAtom);
    const isAuthenticated = useAtomValue(isAuthenticatedAtom);
    const onboarding = useAtomValue(onboardingAtom);

    const signupMode = signupOnboardingModeStorage.load();
    const isSocialSignupInProgress =
        signupMode === "SOCIAL";

    useEffect(() => {
        if (isAuthLoading) return;

        if (!isAuthenticated) return;

        if (!onboarding) return;

        if (isSocialSignupInProgress) {
            if (onboarding.nextStep === "REQUIRED_AGREEMENTS") {
                router.replace("/terms");
                return;
            }

            if (onboarding.nextStep === "REQUIRED_NICKNAME") {
                router.replace("/signup/nickname");
                return;
            }

            if (onboarding.nextStep === "READY") {
                router.replace("/signup/preference");
                return;
            }
        }

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
    }, [
        isAuthLoading,
        isAuthenticated,
        isSocialSignupInProgress,
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