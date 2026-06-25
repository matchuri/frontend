import { groupRecommendationResultPageStyles } from "@/ui/styles/groupRecommendationResultPageStyles";

interface GroupRecommendationResultCandidateCardProps {
    readonly menuName: string;
    readonly matchPercent: number;
    readonly selected: boolean;
    readonly isVoteClosed: boolean;
    readonly onClickVote: () => void;
}

export default function GroupRecommendationResultCandidateCard({
    menuName,
    matchPercent,
    selected,
    isVoteClosed,
    onClickVote,
}: GroupRecommendationResultCandidateCardProps) {
    return (
        <article
            className={
                selected
                    ? groupRecommendationResultPageStyles.selectedCandidateCard
                    : groupRecommendationResultPageStyles.candidateCard
            }
        >
            <div className={groupRecommendationResultPageStyles.candidateImagePlaceholder}>
                <span className={groupRecommendationResultPageStyles.matchBadge}>
                    {matchPercent}% Match
                </span>
            </div>

            <div className={groupRecommendationResultPageStyles.candidateBody}>
                <h3 className={groupRecommendationResultPageStyles.candidateName}>
                    {menuName}
                </h3>

                <button
                    type="button"
                    onClick={onClickVote}
                    disabled={isVoteClosed}
                    className={
                        isVoteClosed
                            ? groupRecommendationResultPageStyles.disabledVoteButton
                            : groupRecommendationResultPageStyles.voteButton
                    }
                >
                    투표하기
                </button>
            </div>
        </article>
    );
}