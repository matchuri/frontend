"use client";

import { useState } from "react";
import { useSetAtom } from "jotai";

import { personalRecommendationAtom } from "@/features/personalRecommendation/application/atoms/personalRecommendationAtom";
import { personalRecommendationApi } from "@/features/personalRecommendation/infrastructure/api/personalRecommendationApi";

import type { LocationSetting } from "@/features/locationSetting/domain/model/LocationSetting";

export function useCompletePersonalRecommendationSelection() {
    const setRecommendationState =
        useSetAtom(
            personalRecommendationAtom,
        );

    const [isCompleting, setIsCompleting] =
        useState(false);

    const completeSelection = async (
        requestId: number,
        selectedCandidateId: number,
        location: LocationSetting,
    ) => {
        if (isCompleting) return;

        setIsCompleting(true);

        try {
            const result =
                await personalRecommendationApi.selectCandidate(
                    requestId,
                    {
                        selectedCandidateId,
                        latitude: location.latitude,
                        longitude: location.longitude,
                        radiusMeters:
                            location.radiusMeters,
                        address: location.address,
                    },
                );

            setRecommendationState((prev) => {
                if (prev.status !== "SUCCESS") {
                    return prev;
                }

                return {
                    status: "SUCCESS",
                    data: {
                        ...prev.data,
                        status: result.status,
                        selectedCandidateId:
                            result.selectedCandidateId,
                        closedAt: result.closedAt,
                        locationSnapshot: location,
                    },
                };
            });

            return result;
        } catch (error) {
            alert(
                error instanceof Error
                    ? error.message
                    : "추천 메뉴 선택에 실패했습니다.",
            );
        } finally {
            setIsCompleting(false);
        }
    };

    return {
        isCompleting,
        completeSelection,
    };
}