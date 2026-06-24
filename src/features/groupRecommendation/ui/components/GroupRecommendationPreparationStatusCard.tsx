import { groupRecommendationPreparationPageStyles } from "@/ui/styles/groupRecommendationPreparationPageStyles";

interface GroupRecommendationPreparationStatusCardProps {
    readonly totalMemberCount: number;
    readonly readyMemberCount: number;
}

export default function GroupRecommendationPreparationStatusCard({
    totalMemberCount,
    readyMemberCount,
}: GroupRecommendationPreparationStatusCardProps) {
    const progressPercent =
        totalMemberCount === 0
            ? 0
            : (readyMemberCount / totalMemberCount) * 100;

    return (
        <section className={groupRecommendationPreparationPageStyles.preferenceStatusCard}>
            <div className={groupRecommendationPreparationPageStyles.preferenceStatusHeader}>
                <h2 className={groupRecommendationPreparationPageStyles.preferenceStatusTitle}>
                    취향을 등록하는 중...
                </h2>

                <span className={groupRecommendationPreparationPageStyles.preferenceStatusCount}>
                    {readyMemberCount}/{totalMemberCount}
                </span>
            </div>

            <div className={groupRecommendationPreparationPageStyles.progressTrack}>
                <div
                    className={groupRecommendationPreparationPageStyles.progressFill}
                    style={{ width: `${progressPercent}%` }}
                />
            </div>

            <p className={groupRecommendationPreparationPageStyles.preferenceStatusDescription}>
                그룹원 모두가 취향을 입력하면,
                <br />
                모두가 만족할 수 있는 메뉴를 추천해드릴게요.
            </p>
        </section>
    );
}