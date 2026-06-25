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
            : (votedMemberCount / totalMemberCount) * 100;

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

            <div className={groupRecommendationResultPageStyles.progressTrack}>
                <div
                    className={groupRecommendationResultPageStyles.progressFill}
                    style={{ width: `${progressPercent}%` }}
                />
            </div>

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
                    className={groupRecommendationResultPageStyles.voteActionButton}
                >
                    {isFinalizing ? "투표 종료 중..." : "투표 종료"}
                </button>
            )}
        </section>
    );
}