import Image from "next/image";

import { personalRecommendationResultCardStyles } from "@/ui/styles/personalRecommendationResultCardStyles";

interface PersonalRecommendationResultCardProps {
    readonly candidateId: number;
    readonly menuName: string;
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
    score,
    selected,
    disabled = false,
    thumbnailUrl,
    onSelect,
    onClickRestaurant,
}: PersonalRecommendationResultCardProps) {
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
            <div className={personalRecommendationResultCardStyles.imagePlaceholder}>
                {thumbnailUrl ? (
                    <Image
                        src={thumbnailUrl}
                        alt={`${menuName} 이미지`}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className={personalRecommendationResultCardStyles.menuImage}
                    />
                ) : (
                    <span className={personalRecommendationResultCardStyles.imageFallbackText}>
                        이미지 준비중입니다
                    </span>
                )}

                <span className={personalRecommendationResultCardStyles.matchBadge}>
                    {Math.round(score)}% Match
                </span>

                {selected && (
                    <span className={personalRecommendationResultCardStyles.selectedBadge}>
                        선택됨
                    </span>
                )}
            </div>

            <div className={personalRecommendationResultCardStyles.content}>
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
                >
                    맛집 보기
                </button>
            </div>
        </article>
    );
}