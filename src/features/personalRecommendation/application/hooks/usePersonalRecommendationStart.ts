"use client";

import { useCallback, useState } from "react";
import { useSetAtom } from "jotai";
import { useRouter } from "next/navigation";

import type { LocationSetting } from "@/features/locationSetting/domain/model/LocationSetting";
import { personalRecommendationAtom } from "@/features/personalRecommendation/application/atoms/personalRecommendationAtom";
import { personalRecommendationApi } from "@/features/personalRecommendation/infrastructure/api/personalRecommendationApi";

interface UsePersonalRecommendationStartParams {
    readonly location: LocationSetting | null;
    readonly hasPreference: boolean;
}

const MIN_LOADING_TIME_MS = 2000;

function wait(ms: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

export function usePersonalRecommendationStart({
    location,
    hasPreference,
}: UsePersonalRecommendationStartParams) {
    const router = useRouter();

    const setRecommendationState = useSetAtom(personalRecommendationAtom);

    const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
    const [isCreating, setIsCreating] = useState(false);

    const canStartRecommendation = hasPreference && location !== null;

    const startRecommendation = useCallback(async () => {
        if (isCreating) return;

        if (!canStartRecommendation) {
            setIsAlertModalOpen(true);
            return;
        }

        setIsCreating(true);
        setRecommendationState({ status: "LOADING" });

        try {
            const [recommendation] = await Promise.all([
                personalRecommendationApi.createRecommendation(),
                wait(MIN_LOADING_TIME_MS),
            ]);

            setRecommendationState({
                status: "SUCCESS",
                data: recommendation,
            });

            router.push("/personal-recommendation/result");
        } catch (error) {
            setRecommendationState({
                status: "ERROR",
                message:
                    error instanceof Error
                        ? error.message
                        : "개인 메뉴 추천 요청에 실패했습니다.",
            });

            alert(
                error instanceof Error
                    ? error.message
                    : "개인 메뉴 추천 요청에 실패했습니다.",
            );
        } finally {
            setIsCreating(false);
        }
    }, [
        isCreating,
        canStartRecommendation,
        setRecommendationState,
        router,
    ]);

    const closeAlertModal = () => {
        setIsAlertModalOpen(false);
    };

    return {
        canStartRecommendation,
        isAlertModalOpen,
        isCreating,
        startRecommendation,
        closeAlertModal,
    };
}