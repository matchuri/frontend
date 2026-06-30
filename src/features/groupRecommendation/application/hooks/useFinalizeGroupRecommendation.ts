"use client";

import { useState } from "react";

import { finalizeGroupRecommendation } from "@/features/groupRecommendation/application/usecase/finalizeGroupRecommendation";

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
    ) => {
        try {
            setIsFinalizing(true);

            const result = await finalizeGroupRecommendation(
                groupId,
                sessionId,
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