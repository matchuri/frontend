import { personalRecommendationResultCardStyles } from "@/ui/styles/personalRecommendationResultCardStyles";

interface PersonalRecommendationResultCardProps {
    readonly menuName: string;
    readonly score: number;
}

export default function PersonalRecommendationResultCard({
    menuName,
    score,
}: PersonalRecommendationResultCardProps) {
    return (
        <article className={personalRecommendationResultCardStyles.card}>
            <div className={personalRecommendationResultCardStyles.imagePlaceholder}>
                <span className={personalRecommendationResultCardStyles.matchBadge}>
                    {Math.round(score)}% Match
                </span>
            </div>

            <div className={personalRecommendationResultCardStyles.content}>
                <h3 className={personalRecommendationResultCardStyles.menuName}>
                    {menuName}
                </h3>

                <button
                    type="button"
                    className={personalRecommendationResultCardStyles.restaurantButton}
                >
                    맛집 보기
                </button>
            </div>
        </article>
    );
}