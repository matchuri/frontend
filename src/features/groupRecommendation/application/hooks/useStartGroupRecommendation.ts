"use client";

import { useState } from "react";

import { startGroupRecommendation } from "@/features/groupRecommendation/application/usecase/startGroupRecommendation";
import type { GroupRecommendationStartRequest } from "@/features/groupRecommendation/infrastructure/api/dto/GroupRecommendationStartRequest";

interface UseStartGroupRecommendationProps {
    readonly onSuccess?: (sessionId: number) => void;
}

export function useStartGroupRecommendation({
    onSuccess,
}: UseStartGroupRecommendationProps = {}) {
    const [isStarting, setIsStarting] = useState(false);

    const start = async (
        groupId: number,
        request: GroupRecommendationStartRequest,
    ) => {
        try {
            setIsStarting(true);

            const result = await startGroupRecommendation(groupId, request);

            onSuccess?.(result.sessionId);
        } finally {
            setIsStarting(false);
        }
    };

    return {
        isStarting,
        start,
    };
}