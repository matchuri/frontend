"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAtomValue } from "jotai";

import {
    isAuthenticatedAtom,
    isAuthLoadingAtom,
    onboardingAtom,
} from "@/features/auth/application/selectors/authSelectors";
import { getOnboardingRoute } from "@/features/auth/application/onboarding/getOnboardingRoute";
import { accountStorage } from "@/features/signup/infrastructure/storage/accountStorage";
import { signupOnboardingModeStorage } from "@/features/signup/infrastructure/storage/signupOnboardingModeStorage";

interface UseTermsGuardOptions {
    readonly skipRedirect?: boolean;
}

export function useTermsGuard({
    skipRedirect = false,
}: UseTermsGuardOptions = {}) {
    const router = useRouter();
    const isAuthLoading = useAtomValue(isAuthLoadingAtom);
    const isAuthenticated = useAtomValue(isAuthenticatedAtom);
    const onboarding = useAtomValue(onboardingAtom);

    const canAccess = useMemo(() => {
        if (isAuthLoading) {
            return false;
        }

        const signupMode = signupOnboardingModeStorage.load();
        const account = accountStorage.load();

        const isGeneralSignup =
            signupMode === "GENERAL" &&
            !!account &&
            !!account.email &&
            !!account.emailVerificationToken;

        const isSocialSignup =
            isAuthenticated &&
            !!onboarding &&
            onboarding.nextStep !== "READY";

        return isGeneralSignup || isSocialSignup;
    }, [
        isAuthLoading,
        isAuthenticated,
        onboarding,
    ]);

    useEffect(() => {
        if (isAuthLoading) return;
        if (canAccess) return;
        if (skipRedirect) return;

        if (onboarding?.nextStep) {
            router.replace(getOnboardingRoute(onboarding.nextStep));
            return;
        }

        router.replace("/signup");
    }, [
        canAccess,
        isAuthLoading,
        onboarding,
        router,
        skipRedirect,
    ]);

    return {
        isAuthLoading,
        canAccess,
    };
}