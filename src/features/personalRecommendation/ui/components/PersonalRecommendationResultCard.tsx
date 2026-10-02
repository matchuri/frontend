import Image from "next/image";
import { ArrowUpRight, Check } from "lucide-react";

import { personalRecommendationResultCardStyles } from "@/ui/styles/personalRecommendationResultCardStyles";

interface PersonalRecommendationResultCardProps {
    readonly candidateId: number;
    readonly menuName: string;
    readonly rankNo: number;
    readonly score: number;
    readonly selected: boolean;
    readonly disabled?: boolean;
    readonly thumbnailUrl: string | null;
    readonly onSelect: (candidateId: number) => void;
    readonly onClickRestaurant: (candidateId: number) => void;
}

export default function PersonalRecommendationResultCard({
    candidateId,
    menuName,
    rankNo,
    score,
    selected,
    disabled = false,
    thumbnailUrl,
    onSelect,
    onClickRestaurant,
}: PersonalRecommendationResultCardProps) {
    const isFirstRank = rankNo === 1;

    const handleSelect = () => {
        if (disabled) return;

        onSelect(candidateId);
    };

    return (
        <article
            onClick={handleSelect}
            className={
                selected
                    ? personalRecommendationResultCardStyles.selectedCard
                    : personalRecommendationResultCardStyles.card
            }
        >
            <div className={personalRecommendationResultCardStyles.imageWrapper}>
                {thumbnailUrl ? (
                    <Image
                        src={thumbnailUrl}
                        alt={`${menuName} 이미지`}
                        fill
                        sizes="(max-width: 480px) 100vw, 480px"
                        className={personalRecommendationResultCardStyles.menuImage}
                    />
                ) : (
                    <div className={personalRecommendationResultCardStyles.imageFallback}>
                        이미지 준비중입니다
                    </div>
                )}

                <div className={personalRecommendationResultCardStyles.cardBadges}>
                    <span
                        className={
                            isFirstRank
                                ? personalRecommendationResultCardStyles.firstRankBadge
                                : personalRecommendationResultCardStyles.rankBadge
                        }
                    >
                        {rankNo}위
                    </span>

                    <span className={personalRecommendationResultCardStyles.matchBadge}>
                        {Math.round(score)}% 매치
                    </span>
                </div>

                {selected && (
                    <span className={personalRecommendationResultCardStyles.selectedBadge}>
                        <Check size={13} strokeWidth={2.5} aria-hidden="true" />
                        선택됨
                    </span>
                )}
            </div>

            <div className={personalRecommendationResultCardStyles.cardContent}>
                <h3 className={personalRecommendationResultCardStyles.menuName}>
                    {menuName}
                </h3>

                <button
                    type="button"
                    className={personalRecommendationResultCardStyles.restaurantButton}
                    onClick={(event) => {
                        event.stopPropagation();
                        onClickRestaurant(candidateId);
                    }}
                    aria-label={`${menuName} 맛집 보기`}
                >
                    맛집 보기
                    <ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" />
                </button>
            </div>
        </article>
    );
}