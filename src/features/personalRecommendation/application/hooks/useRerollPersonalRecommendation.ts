"use client";

import { useState } from "react";
import { useSetAtom } from "jotai";

import { personalRecommendationAtom } from "@/features/personalRecommendation/application/atoms/personalRecommendationAtom";
import { personalRecommendationApi } from "@/features/personalRecommendation/infrastructure/api/personalRecommendationApi";
import type { PersonalRecommendationRerollType } from "@/features/personalRecommendation/domain/model/PersonalRecommendationRerollType";

export function useRerollPersonalRecommendation() {
    const setRecommendationState = useSetAtom(personalRecommendationAtom);
    const [isRerolling, setIsRerolling] = useState(false);

    const rerollRecommendation = async (
        requestId: number,
        rerollType: PersonalRecommendationRerollType,
    ) => {
        if (isRerolling) return null;

        setIsRerolling(true);

        try {
            const recommendation =
                await personalRecommendationApi.rerollRecommendation(
                    requestId,
                    rerollType,
                );

            setRecommendationState({
                status: "SUCCESS",
                data: recommendation,
            });

            return recommendation;
        } catch (error) {
            alert(
                error instanceof Error
                    ? error.message
                    : "개인 메뉴 추천 재요청에 실패했습니다.",
            );

            return null;
        } finally {
            setIsRerolling(false);
        }
    };

    return {
        isRerolling,
        rerollRecommendation,
    };
}