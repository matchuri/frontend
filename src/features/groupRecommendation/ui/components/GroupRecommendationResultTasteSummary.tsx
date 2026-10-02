import type { GroupRecommendationSessionCategory } from "@/features/groupRecommendation/domain/model/GroupRecommendationSessionDetail";

import { personalRecommendationResultPageStyles } from "@/ui/styles/personalRecommendationResultPageStyles";

interface GroupRecommendationResultTasteSummaryProps {
    readonly categories: readonly GroupRecommendationSessionCategory[] | null;
}

export default function GroupRecommendationResultTasteSummary({
    categories,
}: GroupRecommendationResultTasteSummaryProps) {
    const keywords = [...(categories ?? [])].sort((a, b) => a.rankNo - b.rankNo);

    return (
        <section className={personalRecommendationResultPageStyles.summaryCard}>
            <div className={personalRecommendationResultPageStyles.summaryHeader}>
                <span className={personalRecommendationResultPageStyles.summaryEyebrow}>
                    GROUP TASTE
                </span>

                <h2 className={personalRecommendationResultPageStyles.summaryTitle}>
                    그룹 취향 요약
                </h2>
            </div>

            <div className={personalRecommendationResultPageStyles.keywordGroup}>
                {keywords.length > 0 ? (
                    keywords.map((category) => (
                        <span
                            key={`${category.categoryType}-${category.id}`}
                            className={personalRecommendationResultPageStyles.keywordChip}
                        >
                            #{category.name}
                        </span>
                    ))
                ) : (
                    <span className={personalRecommendationResultPageStyles.emptyText}>
                        표시할 그룹 취향 정보가 없습니다.
                    </span>
                )}
            </div>
        </section>
    );
}