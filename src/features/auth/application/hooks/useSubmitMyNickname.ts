"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { logger } from "@/shared/lib/logger";

import { onboardingApi } from "@/features/auth/infrastructure/api/onboardingApi";
import {
    updateMemberNickname,
    updateOnboarding,
} from "@/features/auth/application/store/authStore";
import { getOnboardingRoute } from "@/features/auth/application/onboarding/getOnboardingRoute";

export function useSubmitMyNickname() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const submit = useCallback(
        async (nickname: string) => {
            if (isSubmitting) return;

            setIsSubmitting(true);

            try {
                const trimmedNickname = nickname.trim();

                const response = await onboardingApi.updateOnboardingNickname({
                    nickname: trimmedNickname,
                });

                logger.log("닉네임 완료 응답:", response.data.onboarding);
                logger.log(
                    "이동 경로:",
                    getOnboardingRoute(response.data.onboarding.nextStep),
                );

                updateOnboarding(response.data.onboarding);
                updateMemberNickname(trimmedNickname);

                router.replace(
                    getOnboardingRoute(response.data.onboarding.nextStep),
                );
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