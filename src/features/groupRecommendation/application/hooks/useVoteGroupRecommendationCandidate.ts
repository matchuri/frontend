"use client";

import { useState } from "react";

import { voteGroupRecommendationCandidate } from "@/features/groupRecommendation/application/usecase/voteGroupRecommendationCandidate";

interface UseVoteGroupRecommendationCandidateProps {
    readonly onSuccess?: () => void;
}

export function useVoteGroupRecommendationCandidate({
    onSuccess,
}: UseVoteGroupRecommendationCandidateProps = {}) {
    const [isVoting, setIsVoting] = useState(false);

    const vote = async (
        groupId: number,
        sessionId: number,
        candidateId: number,
    ) => {
        try {
            setIsVoting(true);

            await voteGroupRecommendationCandidate(
                groupId,
                sessionId,
                candidateId,
            );

            onSuccess?.();
        } finally {
            setIsVoting(false);
        }
    };

    return {
        isVoting,
        vote,
    };
}