import type { PersonalRecommendationHistory } from "@/features/personalRecommendation/domain/model/PersonalRecommendationHistory";

import PersonalRecommendationHistoryCard from "@/features/personalRecommendation/ui/components/PersonalRecommendationHistoryCard";

import { personalRecommendationHistoryPageStyles } from "@/ui/styles/personalRecommendationHistoryPageStyles";

interface PersonalRecommendationHistoryListProps {
    readonly histories: readonly PersonalRecommendationHistory[];
    readonly onClickHistory: (requestId: number) => void;
}

export default function PersonalRecommendationHistoryList({
    histories,
    onClickHistory,
}: PersonalRecommendationHistoryListProps) {
    if (histories.length === 0) {
        return (
            <div className={personalRecommendationHistoryPageStyles.empty}>
                개인 메뉴 추천 이력이 없습니다.
            </div>
        );
    }

    return (
        <div className={personalRecommendationHistoryPageStyles.list}>
            {histories.map((history) => (
                <PersonalRecommendationHistoryCard
                    key={history.id}
                    history={history}
                    onClick={onClickHistory}
                />
            ))}
        </div>
    );
}