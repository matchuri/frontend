import { personalRecommendationResultCardStyles } from "@/ui/styles/personalRecommendationResultCardStyles";

interface PersonalRecommendationResultCardProps {
    readonly candidateId: number;
    readonly menuName: string;
    readonly score: number;
    readonly selected: boolean;
    readonly disabled?: boolean;
    readonly onSelect: (candidateId: number) => void;
}

export default function PersonalRecommendationResultCard({
    candidateId,
    menuName,
    score,
    selected,
    disabled = false,
    onSelect,
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
                    disabled={disabled}
                    className={personalRecommendationResultCardStyles.restaurantButton}
                    onClick={(event) => {
                        event.stopPropagation();
                    }}
                >
                    맛집 보기
                </button>
            </div>
        </article>
    );
}