"use client";

import { useRef, useState } from "react";
import { finalizeGroupRecommendation } from "@/features/groupRecommendation/application/usecase/finalizeGroupRecommendation";
import type { GroupRecommendationSessionLocation } from "@/features/groupRecommendation/domain/model/GroupRecommendationSessionDetail";

interface UseFinalizeGroupRecommendationProps {
    readonly onSuccess?: () => void | Promise<void>;
}

export function useFinalizeGroupRecommendation({
    onSuccess,
}: UseFinalizeGroupRecommendationProps = {}) {
    const [isFinalizing, setIsFinalizing] = useState(false);
    const isFinalizingRef = useRef(false);

    const finalize = async (
        groupId: number,
        sessionId: number,
        location: GroupRecommendationSessionLocation | null,
    ) => {
        if (isFinalizingRef.current) return;

        isFinalizingRef.current = true;
        setIsFinalizing(true);

        try {
            const result = await finalizeGroupRecommendation(
                groupId,
                sessionId,
                location === null
                    ? undefined
                    : {
                        latitude: location.latitude,
                        longitude: location.longitude,
                        radiusMeters: location.radiusMeters,
                        address: location.address,
                    },
            );

            await onSuccess?.();

            return result;
        } finally {
            isFinalizingRef.current = false;
            setIsFinalizing(false);
        }
    };

    return {
        isFinalizing,
        finalize,
    };
}