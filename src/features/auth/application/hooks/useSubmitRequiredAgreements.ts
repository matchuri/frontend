"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { onboardingApi } from "@/features/auth/infrastructure/api/onboardingApi";
import {
    setAuthenticated,
    updateOnboarding,
} from "@/features/auth/application/store/authStore";
import { getOnboardingRoute } from "@/features/auth/application/onboarding/getOnboardingRoute";

interface AgreementItem {
    agreementType: string;
    agreementVersion: string;
}

export function useSubmitRequiredAgreements() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const submit = useCallback(
        async (agreements: AgreementItem[]) => {
            if (isSubmitting) return;

            setIsSubmitting(true);

            try {
                const response = await onboardingApi.submitRequiredAgreements({ agreements });

                if (response.data.accessToken && response.data.member) {
                    setAuthenticated(
                        response.data.accessToken,
                        response.data.onboarding,
                        response.data.member
                    );
                } else {
                    updateOnboarding(response.data.onboarding);
                }

                router.replace(getOnboardingRoute(response.data.onboarding.nextStep));
            } finally {
                setIsSubmitting(false);
            }
        },
        [isSubmitting, router],
    );

    return {
        isSubmitting,
        submit,
    };
}