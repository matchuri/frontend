"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSetAtom } from "jotai";

import { personalRecommendationAtom } from "@/features/personalRecommendation/application/atoms/personalRecommendationAtom";
import { personalRecommendationApi } from "@/features/personalRecommendation/infrastructure/api/personalRecommendationApi";

export function usePersonalRecommendationResultNavigation() {
    const router = useRouter();
    const setRecommendationState = useSetAtom(personalRecommendationAtom);

    const moveToRecommendationResult = useCallback(
        async (requestId: number) => {
            try {
                const recommendation =
                    await personalRecommendationApi.fetchRecommendationDetail(
                        requestId,
                    );

                setRecommendationState({
                    status: "SUCCESS",
                    data: recommendation,
                });

                router.push("/personal-recommendation/result");
            } catch (error) {
                alert(
                    error instanceof Error
                        ? error.message
                        : "추천 결과를 불러오지 못했습니다.",
                );
            }
        },
        [router, setRecommendationState],
    );

    return {
        moveToRecommendationResult,
    };
}