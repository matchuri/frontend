import { groupRecommendationApi } from "@/features/groupRecommendation/infrastructure/api/groupRecommendationApi";

export async function voteGroupRecommendationCandidate(
    groupId: number,
    sessionId: number,
    candidateId: number,
) {
    return groupRecommendationApi.voteCandidate(
        groupId,
        sessionId,
        {
            candidateId,
        },
    );
}