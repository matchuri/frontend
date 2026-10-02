import type { GroupRecommendationReadinessStatus } from "@/features/groupRecommendation/domain/model/GroupRecommendationReadiness";

import { groupRecommendationPreparationPageStyles } from "@/ui/styles/groupRecommendationPreparationPageStyles";

interface GroupRecommendationPreparationStatusCardProps {
    readonly status: GroupRecommendationReadinessStatus;
    readonly totalMemberCount: number;
    readonly readyMemberCount: number;
}

export default function GroupRecommendationPreparationStatusCard({
    status,
    totalMemberCount,
    readyMemberCount,
}: GroupRecommendationPreparationStatusCardProps) {
    // readyMemberCount가 totalMemberCount보다 커져도 100%를 넘지 않도록 방어
    const progressPercent =
        totalMemberCount === 0
            ? 0
            : Math.min(
                  (readyMemberCount / totalMemberCount) * 100,
                  100,
              );

    // 화면 표시용 count도 totalMemberCount를 넘지 않도록 방어
    const safeReadyMemberCount = Math.min(
        readyMemberCount,
        totalMemberCount,
    );

    const isAnalyzing = status === "OPEN";

    return (
        <section className={groupRecommendationPreparationPageStyles.preferenceStatusCard}>
            <div className={groupRecommendationPreparationPageStyles.preferenceStatusHeader}>
                <h2 className={groupRecommendationPreparationPageStyles.preferenceStatusTitle}>
                    {isAnalyzing ? "메뉴를 추천하고 있어요" : "그룹원 준비 현황"}
                </h2>

                <span className={groupRecommendationPreparationPageStyles.preferenceStatusCount}>
                    {safeReadyMemberCount}/{totalMemberCount}명
                </span>
            </div>

            <div
                className={groupRecommendationPreparationPageStyles.progressTrack}
                role="progressbar"
                aria-label="그룹원 준비 진행률"
                aria-valuemin={0}
                aria-valuemax={totalMemberCount}
                aria-valuenow={safeReadyMemberCount}
            >
                <div
                    className={groupRecommendationPreparationPageStyles.progressFill}
                    style={{ width: `${progressPercent}%` }}
                />
            </div>

            <p className={groupRecommendationPreparationPageStyles.preferenceStatusDescription}>
                {isAnalyzing
                    ? "취향 분석이 완료되면 자동으로 결과 화면으로 이동합니다."
                    : "그룹원 모두가 준비를 완료하면 메뉴 추천이 시작돼요."}
            </p>
        </section>
    );
}