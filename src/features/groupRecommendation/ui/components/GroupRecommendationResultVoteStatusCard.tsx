import { groupRecommendationResultPageStyles } from "@/ui/styles/groupRecommendationResultPageStyles";

interface GroupRecommendationResultVoteStatusCardProps {
    readonly totalMemberCount: number;
    readonly votedMemberCount: number;
    readonly isOwner: boolean;
    readonly isVoteClosed: boolean;
    readonly isFinalizing: boolean;
    readonly onClickCloseVote: () => void;
    readonly onClickMoveVoteResult: () => void;
}

export default function GroupRecommendationResultVoteStatusCard({
    totalMemberCount,
    votedMemberCount,
    isOwner,
    isVoteClosed,
    isFinalizing,
    onClickCloseVote,
    onClickMoveVoteResult,
}: GroupRecommendationResultVoteStatusCardProps) {
    const progressPercent =
        totalMemberCount === 0
            ? 0
            : Math.min(100, (votedMemberCount / totalMemberCount) * 100);

    const allVoted =
        totalMemberCount > 0 && totalMemberCount === votedMemberCount;

    return (
        <section className={groupRecommendationResultPageStyles.voteStatusCard}>
            <div className={groupRecommendationResultPageStyles.voteStatusHeader}>
                <h2 className={groupRecommendationResultPageStyles.voteStatusTitle}>
                    투표 진행 현황
                </h2>

                <span className={groupRecommendationResultPageStyles.voteStatusCount}>
                    {votedMemberCount}/{totalMemberCount}
                </span>
            </div>

            <div
                className={groupRecommendationResultPageStyles.progressTrack}
                role="progressbar"
                aria-label="그룹 투표 진행률"
                aria-valuemin={0}
                aria-valuemax={totalMemberCount}
                aria-valuenow={votedMemberCount}
            >
                <div
                    className={groupRecommendationResultPageStyles.progressFill}
                    style={{ width: `${progressPercent}%` }}
                />
            </div>

            <p className={groupRecommendationResultPageStyles.voteStatusDescription}>
                {isVoteClosed
                    ? "투표가 종료되었어요."
                    : allVoted
                        ? "모든 그룹원이 투표를 완료했어요."
                        : `${totalMemberCount - votedMemberCount}명의 투표를 기다리고 있어요.`}
            </p>

            {isVoteClosed && (
                <button
                    type="button"
                    onClick={onClickMoveVoteResult}
                    className={groupRecommendationResultPageStyles.resultActionButton}
                >
                    투표 결과 보러 가기
                </button>
            )}

            {!isVoteClosed && allVoted && isOwner && (
                <button
                    type="button"
                    onClick={onClickCloseVote}
                    disabled={isFinalizing}
                    className={groupRecommendationResultPageStyles.voteActionButton}
                >
                    {isFinalizing ? "투표 종료 중..." : "투표 종료"}
                </button>
            )}
        </section>
    );
}