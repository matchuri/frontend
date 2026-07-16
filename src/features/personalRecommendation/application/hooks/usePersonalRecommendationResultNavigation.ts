// 결과 URL로 이동

"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";

export function usePersonalRecommendationResultNavigation() {
    const router = useRouter();

    const moveToRecommendationResult = useCallback(
        (requestId: number) => {
            router.push(
                `/personal-recommendation/${requestId}/result`,
            );
        },
        [router],
    );

    return {
        moveToRecommendationResult,
    };
}