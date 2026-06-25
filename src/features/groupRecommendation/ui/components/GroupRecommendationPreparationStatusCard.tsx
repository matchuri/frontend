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
                    {isAnalyzing
                        ? "취향을 분석하는 중..."
                        : "취향을 등록하는 중..."}
                </h2>

                <span className={groupRecommendationPreparationPageStyles.preferenceStatusCount}>
                    {safeReadyMemberCount}/{totalMemberCount}
                </span>
            </div>

            <div className={groupRecommendationPreparationPageStyles.progressTrack}>
                <div
                    className={groupRecommendationPreparationPageStyles.progressFill}
                    style={{ width: `${progressPercent}%` }}
                />
            </div>

            <p className={groupRecommendationPreparationPageStyles.preferenceStatusDescription}>
                {isAnalyzing ? (
                    <>
                        취향 분석이 완료되면 자동으로 결과 화면으로 이동합니다.
                        <br />
                        잠시만 기다려주세요..
                    </>
                ) : (
                    <>
                        그룹원 모두가 취향을 입력하면,
                        <br />
                        모두가 만족할 수 있는 메뉴를 추천해드릴게요.
                    </>
                )}
            </p>
        </section>
    );
}