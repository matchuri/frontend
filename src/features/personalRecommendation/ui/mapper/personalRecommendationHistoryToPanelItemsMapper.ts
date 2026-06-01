import type { PersonalRecommendationHistory } from "@/features/personalRecommendation/domain/model/PersonalRecommendationHistory";

function formatKoreanDate(dateString: string) {
    const date = new Date(dateString);

    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
}

export function personalRecommendationHistoryToPanelItemsMapper(
    histories: readonly PersonalRecommendationHistory[],
) {
    return histories.map((history) => ({
        id: history.id,
        recommendedDate: formatKoreanDate(history.closedAt ?? history.requestedAt),
    }));
}