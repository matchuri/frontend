"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import type { GuestRecommendationSetting } from "@/features/guestRecommendation/domain/model/GuestRecommendationSetting";
import { canStartGuestRecommendation } from "@/features/guestRecommendation/domain/validator/canStartGuestRecommendation";
import { createGuestRecommendation } from "@/features/guestRecommendation/application/usecase/createGuestRecommendation";

interface UseGuestRecommendationStartParams {
    readonly setting: GuestRecommendationSetting;
}

const MIN_LOADING_TIME_MS = 2000;

function wait(ms: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

export function useGuestRecommendationStart({
    setting,
}: UseGuestRecommendationStartParams) {
    const router = useRouter();
    const [isCreating, setIsCreating] = useState(false);

    const canStartRecommendation = useMemo(
        () => canStartGuestRecommendation(setting),
        [setting],
    );

    const startRecommendation = useCallback(async () => {
        if (isCreating || !canStartRecommendation) {
            return;
        }

        setIsCreating(true);

        try {
            await Promise.all([
                createGuestRecommendation(setting.preference),
                wait(MIN_LOADING_TIME_MS),
            ]);

            router.push("/guest-recommendation/result");
        } catch (error) {
            alert(
                error instanceof Error
                    ? error.message
                    : "비회원 메뉴 추천 요청에 실패했습니다.",
            );

            setIsCreating(false);
        }
    }, [
        isCreating,
        canStartRecommendation,
        setting.preference,
        router,
    ]);

    return {
        canStartRecommendation,
        isCreating,
        startRecommendation,
    };
}