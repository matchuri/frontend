"use client";

import { useCallback, useEffect } from "react";
import { useSetAtom } from "jotai";

import { groupRecommendationReadinessAtom } from "@/features/groupRecommendation/application/atoms/groupRecommendationReadinessAtom";
import { fetchGroupRecommendationReadiness } from "@/features/groupRecommendation/application/usecase/fetchGroupRecommendationReadiness";

interface FetchReadinessOptions {
    readonly showLoading?: boolean;
}

export function useGroupRecommendationReadiness(
    groupId: number,
    sessionId: number,
) {
    const setReadinessState = useSetAtom(
        groupRecommendationReadinessAtom,
    );

    const fetchReadiness = useCallback(
        async ({ showLoading = true }: FetchReadinessOptions = {}) => {
            if (showLoading) {
                setReadinessState({ status: "LOADING" });
            }

            try {
                const data = await fetchGroupRecommendationReadiness(
                    groupId,
                    sessionId,
                );

                setReadinessState({
                    status: "SUCCESS",
                    data,
                });
            } catch {
                setReadinessState({
                    status: "ERROR",
                    message:
                        "그룹 추천 준비 상태를 불러오지 못했습니다.",
                });
            }
        },
        [groupId, sessionId, setReadinessState],
    );

    useEffect(() => {
        fetchReadiness();
    }, [fetchReadiness]);

    return {
        refetchReadiness: fetchReadiness,
    };
}