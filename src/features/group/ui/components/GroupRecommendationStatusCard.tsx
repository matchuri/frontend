import type { GroupDetailRecommendation } from "@/features/group/domain/model/GroupDetail";

import { groupRecommendationStatusCardStyles } from "@/ui/styles/groupRecommendationStatusCardStyles";

interface GroupRecommendationStatusCardProps {
    readonly recommendation: GroupDetailRecommendation;
    readonly onClickOpenRestaurantMap: () => void;
}

export default function GroupRecommendationStatusCard({
    recommendation,
    onClickOpenRestaurantMap,
}: GroupRecommendationStatusCardProps) {
    if (recommendation.status === "OPEN") {
        const totalMemberCount = recommendation.voteProgress?.totalMemberCount ?? 0;
        const votedMemberCount = recommendation.voteProgress?.votedMemberCount ?? 0;

        const progressPercent =
            totalMemberCount === 0
                ? 0
                : Math.min((votedMemberCount / totalMemberCount) * 100, 100,);

        return (
            <section className={groupRecommendationStatusCardStyles.openCard}>
                <div className={groupRecommendationStatusCardStyles.cardHeader}>
                    <div>
                        <p className={groupRecommendationStatusCardStyles.cardTitle}>
                            추천 메뉴 투표 진행 중
                        </p>

                        <p className={groupRecommendationStatusCardStyles.cardDescription}>
                            참여 인원 {totalMemberCount}명 중 {votedMemberCount}명이 투표를 완료했습니다.
                        </p>
                    </div>

                    <span className={groupRecommendationStatusCardStyles.percentText}>
                        {Math.round(progressPercent)}%
                    </span>
                </div>

                <div className={groupRecommendationStatusCardStyles.progressTrack}>
                    <div
                        className={groupRecommendationStatusCardStyles.openProgressFill}
                        style={{ width: `${progressPercent}%` }}
                    />
                </div>
            </section>
        );
    }

    if (recommendation.status === "FINALIZED") {
        const finalMenuName =
            recommendation.finalCandidate?.menuName ?? "선정된 메뉴";

        return (
            <section className={groupRecommendationStatusCardStyles.finalizedCard}>
                <p className={groupRecommendationStatusCardStyles.cardTitle}>
                    투표 결과 확인하기
                </p>

                <p className={groupRecommendationStatusCardStyles.cardDescription}>
                    투표 결과 `{finalMenuName}`으로 메뉴가 선정되었습니다.
                </p>

                <button
                    type="button"
                    onClick={onClickOpenRestaurantMap}
                    className={groupRecommendationStatusCardStyles.mapButton}
                >
                    맛집 지도 보러가기
                </button>
            </section>
        );
    }

    return null;
}