import Image from "next/image";
import { Check } from "lucide-react";

import { groupRecommendationResultPageStyles } from "@/ui/styles/groupRecommendationResultPageStyles";

interface GroupRecommendationResultCandidateCardProps {
    readonly menuName: string;
    readonly matchPercent: number;
    readonly selected: boolean;
    readonly isVoteClosed: boolean;
    readonly thumbnailUrl: string | null;
    readonly onSelect: () => void;
}

export default function GroupRecommendationResultCandidateCard({
    menuName,
    matchPercent,
    selected,
    isVoteClosed,
    thumbnailUrl,
    onSelect,
}: GroupRecommendationResultCandidateCardProps) {
    return (
        <article
            className={
                selected
                    ? groupRecommendationResultPageStyles.selectedCandidateCard
                    : groupRecommendationResultPageStyles.candidateCard
            }
        >
            <button
                type="button"
                onClick={onSelect}
                disabled={isVoteClosed}
                aria-pressed={selected}
                aria-label={`${menuName}, 매칭률 ${matchPercent}%, ${selected ? "선택됨" : "선택하기"}`}
                className={groupRecommendationResultPageStyles.candidateSelectButton}
            >
                <div className={groupRecommendationResultPageStyles.candidateImageWrapper}>
                    {thumbnailUrl ? (
                        <Image
                            src={thumbnailUrl}
                            alt={`${menuName} 이미지`}
                            fill
                            sizes="(max-width: 480px) 100vw, 480px"
                            className={groupRecommendationResultPageStyles.candidateImage}
                        />
                    ) : (
                        <div className={groupRecommendationResultPageStyles.candidateImageFallback}>
                            이미지 준비중입니다
                        </div>
                    )}

                    <div className={groupRecommendationResultPageStyles.candidateBadges}>
                        <span className={groupRecommendationResultPageStyles.matchBadge}>
                            {matchPercent}% 매치
                        </span>
                    </div>

                    {selected && (
                        <span className={groupRecommendationResultPageStyles.selectedBadge}>
                            <Check size={13} strokeWidth={2.5} aria-hidden="true" />
                            선택됨
                        </span>
                    )}
                </div>

                <div className={groupRecommendationResultPageStyles.candidateBody}>
                    <h3 className={groupRecommendationResultPageStyles.candidateName}>
                        {menuName}
                    </h3>
                </div>
            </button>
        </article>
    );
}