"use client";

import { useEffect } from "react";
import { useSetAtom } from "jotai";

import { personalRecommendationAtom } from "@/features/personalRecommendation/application/atoms/personalRecommendationAtom";
import { personalRecommendationApi } from "@/features/personalRecommendation/infrastructure/api/personalRecommendationApi";

interface UsePersonalRecommendationDetailParams {
    readonly requestId: number | null;
}

export function usePersonalRecommendationDetail({
    requestId,
}: UsePersonalRecommendationDetailParams) {
    const setRecommendationState = useSetAtom(
        personalRecommendationAtom,
    );

    useEffect(() => {
        if (requestId === null) {
            return;
        }

        let isCancelled = false;

        const fetchRecommendationDetail = async () => {
            setRecommendationState({
                status: "LOADING",
            });

            try {
                const recommendation =
                    await personalRecommendationApi.fetchRecommendationDetail(
                        requestId,
                    );

                if (isCancelled) {
                    return;
                }

                setRecommendationState({
                    status: "SUCCESS",
                    data: recommendation,
                });
            } catch (error) {
                if (isCancelled) {
                    return;
                }

                setRecommendationState({
                    status: "ERROR",
                    message:
                        error instanceof Error
                            ? error.message
                            : "추천 결과를 불러오지 못했습니다.",
                });
            }
        };

        void fetchRecommendationDetail();

        return () => {
            isCancelled = true;
        };
    }, [requestId, setRecommendationState]);
}