import type { PersonalRecommendation } from "@/features/personalRecommendation/domain/model/PersonalRecommendation";
import type { PersonalRecommendationDetailData } from "@/features/personalRecommendation/infrastructure/api/dto/PersonalRecommendationDetailResponse";

export function mapPersonalRecommendationDetail(
    data: PersonalRecommendationDetailData,
): PersonalRecommendation {
    return {
        requestId: data.id,
        status: data.status,
        requestedAt: "",
        closedAt: data.closedAt,
        selectedCandidateId: data.selectedCandidateId,
        candidates: data.candidates.map((candidate) => ({
            id: candidate.id,
            menuId: candidate.menuId,
            menuName: candidate.menuName,
            rankNo: candidate.rankNo,
            score: candidate.score,
        })),
    };
}