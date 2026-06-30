import Image from "next/image";

import { groupRecommendationResultPageStyles } from "@/ui/styles/groupRecommendationResultPageStyles";

interface GroupRecommendationResultCandidateCardProps {
    readonly menuName: string;
    readonly matchPercent: number;
    readonly selected: boolean;
    readonly isVoteClosed: boolean;
    // 투표 API 요청 중인지 여부
    readonly isVoting: boolean;
    readonly thumbnailUrl: string | null;

    readonly onClickVote: () => void;
}

export default function GroupRecommendationResultCandidateCard({
    menuName,
    matchPercent,
    selected,
    isVoteClosed,
    isVoting,
    thumbnailUrl,
    onClickVote,
}: GroupRecommendationResultCandidateCardProps) {
    const isVoteButtonDisabled = isVoteClosed || isVoting;

    return (
        <article
            className={
                selected
                    ? groupRecommendationResultPageStyles.selectedCandidateCard
                    : groupRecommendationResultPageStyles.candidateCard
            }
        >
            <div className={groupRecommendationResultPageStyles.candidateImagePlaceholder}>
                {thumbnailUrl ? (
                    <Image
                        src={thumbnailUrl}
                        alt={`${menuName} 이미지`}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className={groupRecommendationResultPageStyles.candidateImage}
                    />
                ) : (
                    <span className={groupRecommendationResultPageStyles.candidateImageFallbackText}>
                        이미지 준비중입니다
                    </span>
                )}

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

                    // 투표 종료 또는 투표 요청 중이면 버튼 비활성화
                    disabled={isVoteButtonDisabled}
                    className={
                        isVoteButtonDisabled
                            ? groupRecommendationResultPageStyles.disabledVoteButton
                            : groupRecommendationResultPageStyles.voteButton
                    }
                >
                    {isVoting ? "투표 중..." : "투표하기"}
                </button>
            </div>
        </article>
    );
}