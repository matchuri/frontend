"use client";

import { useCallback, useEffect } from "react";
import { useSetAtom } from "jotai";

import { groupRecommendationSessionDetailAtom } from "@/features/groupRecommendation/application/atoms/groupRecommendationSessionDetailAtom";
import { fetchGroupRecommendationSessionDetail } from "@/features/groupRecommendation/application/usecase/fetchGroupRecommendationSessionDetail";

// 재조회 시 로딩 화면 표시 여부 옵션
interface FetchSessionDetailOptions {
    readonly showLoading?: boolean;
}

export function useGroupRecommendationSessionDetail(
    groupId: number,
    sessionId: number,
) {
    const setSessionDetailState = useSetAtom(
        groupRecommendationSessionDetailAtom,
    );

    const fetchSessionDetail = useCallback(
        async ({ showLoading = true }: FetchSessionDetailOptions = {}) => {
            if (showLoading) {
                setSessionDetailState({ status: "LOADING" });
            }

            try {
                const data = await fetchGroupRecommendationSessionDetail(
                    groupId,
                    sessionId,
                );

                setSessionDetailState({
                    status: "SUCCESS",
                    data,
                });
            } catch {
                setSessionDetailState({
                    status: "ERROR",
                    message: "그룹 추천 세션 정보를 불러오지 못했습니다.",
                });
            }
        },
        [groupId, sessionId, setSessionDetailState],
    );

    useEffect(() => {
        fetchSessionDetail();
    }, [fetchSessionDetail]);

    return {
        refetchSessionDetail: fetchSessionDetail,
    };
}