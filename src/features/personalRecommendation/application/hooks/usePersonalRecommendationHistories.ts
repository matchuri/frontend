"use client";

import {
    useCallback,
    useEffect,
    useState,
} from "react";

import type { PersonalRecommendationHistory } from "@/features/personalRecommendation/domain/model/PersonalRecommendationHistory";

import { personalRecommendationApi } from "@/features/personalRecommendation/infrastructure/api/personalRecommendationApi";

export function usePersonalRecommendationHistories(
    enabled: boolean,
) {
    const [histories, setHistories] =
        useState<readonly PersonalRecommendationHistory[] | null>(null);

    const [errorMessage, setErrorMessage] =
        useState<string | null>(null);

    const refetchHistories =
        useCallback(async () => {
            if (!enabled) {
                return;
            }

            setHistories(null);
            setErrorMessage(null);

            try {
                const data = await personalRecommendationApi.fetchHistories();

                setHistories(data);
            } catch (error) {
                setHistories([]);
                setErrorMessage(
                    error instanceof Error
                        ? error.message
                        : "개인 메뉴 추천 이력을 불러오지 못했습니다.",
                );
            }
        }, [enabled]);

    useEffect(() => {
        if (!enabled) {
            return;
        }

        let cancelled = false;

        personalRecommendationApi
            .fetchHistories()
            .then((data) => {
                if (cancelled) {
                    return;
                }

                setHistories(data);
                setErrorMessage(null);
            })
            .catch((error) => {
                if (cancelled) {
                    return;
                }

                setHistories([]);
                setErrorMessage(
                    error instanceof Error
                        ? error.message
                        : "개인 메뉴 추천 이력을 불러오지 못했습니다.",
                );
            });

        return () => {
            cancelled = true;
        };
    }, [enabled]);

    return {
        histories: histories ?? [],
        isLoading:
            enabled &&
            histories === null &&
            errorMessage === null,
        errorMessage,
        refetchHistories,
    };
}