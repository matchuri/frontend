import type { PersonalRecommendationHistory } from "@/features/personalRecommendation/domain/model/PersonalRecommendationHistory";

function formatKoreanDate(dateString: string) {
    const [datePart] = dateString.split("T");
    const [year, month, day] = datePart.split("-").map(Number);

    return `${year}년 ${month}월 ${day}일`;
}

export function personalRecommendationHistoryToPanelItemsMapper(
    histories: readonly PersonalRecommendationHistory[],
) {
    return histories
        .filter((history) => history.status === "SELECTED")
        .map((history) => ({
            id: history.id,
            recommendedDate: formatKoreanDate(history.requestedAt),
        }));
}