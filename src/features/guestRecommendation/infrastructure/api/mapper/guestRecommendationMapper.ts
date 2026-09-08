import type { GuestRecommendation } from "@/features/guestRecommendation/domain/model/GuestRecommendation";
import type { GuestRecommendationData } from "@/features/guestRecommendation/infrastructure/api/dto/GuestRecommendationResponse";

export function mapGuestRecommendation(
    data: GuestRecommendationData,
): GuestRecommendation {
    return {
        candidates: data.candidates.map(
            (candidate) => ({
                menuId: candidate.menuId,
                menuName: candidate.menuName,
                rankNo: candidate.rankNo,
                score: candidate.score,
            }),
        ),
    };
}