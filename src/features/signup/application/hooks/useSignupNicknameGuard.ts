"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAtomValue } from "jotai";

import {
    isAuthenticatedAtom,
    isAuthLoadingAtom,
    onboardingAtom,
} from "@/features/auth/application/selectors/authSelectors";
import { accountStorage } from "@/features/signup/infrastructure/storage/accountStorage";
import { signupOnboardingModeStorage } from "@/features/signup/infrastructure/storage/signupOnboardingModeStorage";
import { termsStorage } from "@/features/terms/infrastructure/storage/termsStorage";
import { getOnboardingRoute } from "@/features/auth/application/onboarding/getOnboardingRoute";

export function useSignupNicknameGuard() {
    const router = useRouter();
    const isAuthLoading = useAtomValue(isAuthLoadingAtom);
    const isAuthenticated = useAtomValue(isAuthenticatedAtom);
    const onboarding = useAtomValue(onboardingAtom);

    useEffect(() => {
        if (isAuthLoading) {
            return;
        }

        const signupMode = signupOnboardingModeStorage.load();
        const account = accountStorage.load();
        const savedAgreements = termsStorage.load();

        const isGeneralSignup =
            signupMode === "GENERAL" &&
            !!account &&
            !!account.email &&
            !!account.emailVerificationToken &&
            !!savedAgreements &&
            savedAgreements.length > 0;

        const isSocialSignup =
            isAuthenticated &&
            (
                onboarding?.nextStep === "REQUIRED_NICKNAME" ||
                onboarding?.nextStep === "REQUIRED_TASTE_PROFILE"
            );

        if (isGeneralSignup || isSocialSignup) return;

        if (onboarding?.nextStep) {
            router.replace(getOnboardingRoute(onboarding.nextStep));
            return;
        }

        router.replace("/signup");
    }, [
        isAuthLoading,
        isAuthenticated,
        router,
        onboarding,
    ]);
}