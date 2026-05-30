"use client";

import { useState } from "react";
import type { LocationSetting } from "@/features/locationSetting/domain/model/LocationSetting";

interface UsePersonalRecommendationStartParams {
    readonly location: LocationSetting | null;
    readonly hasPreference: boolean;
}

export function usePersonalRecommendationStart({
    location,
    hasPreference,
}: UsePersonalRecommendationStartParams) {
    const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);

    const canStartRecommendation = hasPreference && location !== null;

    const startRecommendation = () => {
        if (!canStartRecommendation) {
            setIsAlertModalOpen(true);
            return;
        }

        // TODO: 추천 API 호출/로딩 화면 이동 연결
        console.log("메뉴 추천 시작 가능");
    };

    const closeAlertModal = () => {
        setIsAlertModalOpen(false);
    };

    return {
        canStartRecommendation,
        isAlertModalOpen,
        startRecommendation,
        closeAlertModal,
    };
}