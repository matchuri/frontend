"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAtomValue } from "jotai";

import { onboardingAtom } from "@/features/auth/application/selectors/authSelectors";
import { getOnboardingRoute } from "@/features/auth/application/onboarding/getOnboardingRoute";
import { accountStorage } from "@/features/signup/infrastructure/storage/accountStorage";

export function useTermsGuard() {
    const router = useRouter();
    const onboarding = useAtomValue(onboardingAtom);

    const canAccess = useMemo(() => {
        const account = accountStorage.load();

        const isGeneralSignup =
            !!account &&
            !!account.email &&
            !!account.emailVerificationToken;

        return (
            isGeneralSignup ||
            onboarding?.nextStep === "REQUIRED_AGREEMENTS"
        );
    }, [onboarding]);

    useEffect(() => {
        if (canAccess) return;

        if (onboarding?.nextStep) {
            router.replace(getOnboardingRoute(onboarding.nextStep));
            return;
        }

        router.replace("/signup");
    }, [canAccess, onboarding, router]);

    return {
        canAccess,
    };
}