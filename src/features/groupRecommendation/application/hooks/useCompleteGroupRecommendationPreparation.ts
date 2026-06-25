"use client";

import { useState } from "react";
import { useSetAtom } from "jotai";

import { groupRecommendationReadinessAtom } from "@/features/groupRecommendation/application/atoms/groupRecommendationReadinessAtom";
import { completeGroupRecommendationPreparation } from "@/features/groupRecommendation/application/usecase/completeGroupRecommendationPreparation";

export function useCompleteGroupRecommendationPreparation() {
    const [isCompletingPreparation, setIsCompletingPreparation] = useState(false);

    const setReadinessState = useSetAtom(groupRecommendationReadinessAtom);

    const completePreparation = async (
        groupId: number,
        sessionId: number,
        memberId: number,
    ) => {
        try {
            setIsCompletingPreparation(true);

            const result = await completeGroupRecommendationPreparation(
                groupId,
                sessionId,
            );

            setReadinessState((prev) => {
                if (prev.status !== "SUCCESS") {
                    return prev;
                }

                return {
                    status: "SUCCESS",
                    data: {
                        ...prev.data,
                        status: result.status,
                        progress: {
                            totalMemberCount: result.readiness.totalMemberCount,
                            readyMemberCount: result.readiness.readyMemberCount,
                            allReady: result.readiness.allReady,
                        },
                        members: prev.data.members.map((member) =>
                            member.memberId === memberId
                                ? {
                                      ...member,
                                      ready: true,
                                  }
                                : member,
                        ),
                    },
                };
            });

            return result;
        } finally {
            setIsCompletingPreparation(false);
        }
    };

    return {
        isCompletingPreparation,
        completePreparation,
    };
}