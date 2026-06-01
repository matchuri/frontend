import { Clock3 } from "lucide-react";

import { personalRecommendationPageStyles } from "@/ui/styles/personalRecommendationPageStyles";

interface PersonalRecommendationHistoryItem {
    readonly id: number;
    readonly recommendedDate: string;
}

interface PersonalRecommendationHistoryPanelProps {
    readonly histories: readonly PersonalRecommendationHistoryItem[];

    readonly onClickDetail?: (requestId: number) => void;
}

export default function PersonalRecommendationHistoryPanel({
    histories,
    onClickDetail,
}: PersonalRecommendationHistoryPanelProps) {
    const hasHistories = histories.length > 0;

    return (
        <aside className={personalRecommendationPageStyles.historyPanel}>
            {hasHistories ? (
                <div className={personalRecommendationPageStyles.historyList}>
                    {histories.map((history) => (
                        <button
                            key={history.id}
                            type="button"
                            onClick={() => onClickDetail?.(history.id)}
                            className={personalRecommendationPageStyles.historyItem}
                        >
                            <span>{history.recommendedDate}</span>

                            <span
                                className={
                                    personalRecommendationPageStyles.historyDetailButton
                                }
                            >
                                자세히 보기
                            </span>
                        </button>
                    ))}
                </div>
            ) : (
                <div className={personalRecommendationPageStyles.emptyHistory}>
                    <div
                        className={
                            personalRecommendationPageStyles.emptyIconBox
                        }
                    >
                        <Clock3 size={34} />
                    </div>

                    <p>기록이 없습니다.</p>
                </div>
            )}
        </aside>
    );
}