"use client";

import { useState } from "react";

import { finalizeGroupRecommendation } from "@/features/groupRecommendation/application/usecase/finalizeGroupRecommendation";

import type { GroupDetailLocation } from "@/features/group/domain/model/GroupDetail";

interface UseFinalizeGroupRecommendationProps {
    readonly onSuccess?: () => void;
}

export function useFinalizeGroupRecommendation({
    onSuccess,
}: UseFinalizeGroupRecommendationProps = {}) {
    const [isFinalizing, setIsFinalizing] = useState(false);

    const finalize = async (
        groupId: number,
        sessionId: number,
        location: GroupDetailLocation,
    ) => {
        try {
            setIsFinalizing(true);

            const result = await finalizeGroupRecommendation(
                groupId,
                sessionId,
                {
                    latitude: location.latitude,
                    longitude: location.longitude,
                    radiusMeters: location.radiusMeters,
                    address: location.address,
                },
            );

            onSuccess?.();

            return result;
        } finally {
            setIsFinalizing(false);
        }
    };

    return {
        isFinalizing,
        finalize,
    };
}