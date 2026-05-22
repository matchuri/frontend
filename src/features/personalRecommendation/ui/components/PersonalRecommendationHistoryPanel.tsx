import { Clock3 } from "lucide-react";
import { personalRecommendationPageStyles } from "@/ui/styles/personalRecommendationPageStyles";

interface PersonalRecommendationHistory {
    readonly id: number;
    readonly recommendedDate: string;
}

interface PersonalRecommendationHistoryPanelProps {
    readonly histories: readonly PersonalRecommendationHistory[];
}

export default function PersonalRecommendationHistoryPanel({
    histories,
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
                            className={personalRecommendationPageStyles.historyItem}
                        >
                            {history.recommendedDate}
                        </button>
                    ))}
                </div>
            ) : (
                <div className={personalRecommendationPageStyles.emptyHistory}>
                    <div className={personalRecommendationPageStyles.emptyIconBox}>
                        <Clock3 size={34} />
                    </div>
                    <p>기록이 없습니다.</p>
                </div>
            )}
        </aside>
    );
}