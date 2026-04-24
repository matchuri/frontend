"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { authApi } from "@/features/auth/infrastructure/api/authApi";
import {
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
                const response = await authApi.updateOnboardingNickname({
                    nickname,
                });

                console.log("닉네임 완료 응답:", response.data.onboarding);
                console.log(
                    "이동 경로:",
                    getOnboardingRoute(response.data.onboarding.nextStep)
                );

                // onboarding 상태 업데이트
                updateOnboarding(response.data.onboarding);

                // 다음 단계 이동 (READY → /home)
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