"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAtomValue } from "jotai";

import { onboardingAtom } from "@/features/auth/application/selectors/authSelectors";
import { accountStorage } from "@/features/signup/infrastructure/storage/accountStorage";
import { termsStorage } from "@/features/terms/infrastructure/storage/termsStorage";
import { getOnboardingRoute } from "@/features/auth/application/onboarding/getOnboardingRoute";

export function useSignupNicknameGuard() {
    const router = useRouter();
    const onboarding = useAtomValue(onboardingAtom);

    useEffect(() => {
        const account = accountStorage.load();
        const savedAgreements = termsStorage.load();

        const isGeneralSignup =
            !!account &&
            !!account.email &&
            !!account.emailVerificationToken &&
            !!savedAgreements &&
            savedAgreements.length > 0;

        if (isGeneralSignup) return;

        if (onboarding?.nextStep === "REQUIRED_NICKNAME") return;

        if (onboarding?.nextStep) {
            router.replace(getOnboardingRoute(onboarding.nextStep));
            return;
        }

        router.replace("/signup");
    }, [router, onboarding]);
}