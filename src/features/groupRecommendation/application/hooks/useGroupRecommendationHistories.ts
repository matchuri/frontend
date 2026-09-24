"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchGroupRecommendationHistories } from "@/features/groupRecommendation/application/usecase/fetchGroupRecommendationHistories";
import type { GroupRecommendationHistory } from "@/features/groupRecommendation/domain/model/GroupRecommendationHistory";

export function useGroupRecommendationHistories(
    groupId: number,
) {
    const [histories, setHistories] = useState<
        readonly GroupRecommendationHistory[]
    >([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] =
        useState<string | null>(null);

    const refetchHistories = useCallback(async () => {
        try {
            setIsLoading(true);
            setErrorMessage(null);

            const data =
                await fetchGroupRecommendationHistories(
                    groupId,
                );

            setHistories(data);
        } catch (error) {
            setHistories([]);
            setErrorMessage(
                error instanceof Error
                    ? error.message
                    : "그룹 추천 결과 기록을 불러오는데 실패했습니다.",
            );
        } finally {
            setIsLoading(false);
        }
    }, [groupId]);

    useEffect(() => {
        void refetchHistories();
    }, [refetchHistories]);

    return {
        histories,
        isLoading,
        errorMessage,
        refetchHistories,
    };
}