"use client";

import { useCallback, useEffect, useState } from "react";

import { personalRecommendationApi } from "@/features/personalRecommendation/infrastructure/api/personalRecommendationApi";
import type { PersonalRecommendationHistory } from "@/features/personalRecommendation/domain/model/PersonalRecommendationHistory";

export function usePersonalRecommendationHistories() {
    const [histories, setHistories] = useState<
        readonly PersonalRecommendationHistory[]
    >([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchHistories = useCallback(async () => {
        setIsLoading(true);

        try {
            const data = await personalRecommendationApi.fetchHistories();
            setHistories(data);
        } catch {
            setHistories([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchHistories();
    }, [fetchHistories]);

    return {
        histories,
        isLoading,
        refetchHistories: fetchHistories,
    };
}