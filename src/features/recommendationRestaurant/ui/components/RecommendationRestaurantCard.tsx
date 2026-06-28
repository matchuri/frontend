import { Star } from "lucide-react";

import type { RecommendationRestaurant } from "@/features/recommendationRestaurant/domain/model/RecommendationRestaurant";
import { recommendationRestaurantPageStyles } from "@/ui/styles/recommendationRestaurantPageStyles";

interface RecommendationRestaurantCardProps {
    readonly restaurant: RecommendationRestaurant;
}

export default function RecommendationRestaurantCard({
    restaurant,
}: RecommendationRestaurantCardProps) {
    return (
        <article className={recommendationRestaurantPageStyles.restaurantCard}>
            <div className={recommendationRestaurantPageStyles.restaurantThumbnail} />

            <div className={recommendationRestaurantPageStyles.restaurantInfo}>
                <h2 className={recommendationRestaurantPageStyles.restaurantName}>
                    {restaurant.name}
                </h2>

                <p className={recommendationRestaurantPageStyles.restaurantDistance}>
                    {restaurant.distanceText}
                </p>
            </div>

            {restaurant.rating !== null && (
                <span className={recommendationRestaurantPageStyles.ratingBadge}>
                    {restaurant.rating.toFixed(1)}
                    <Star size={13} fill="currentColor" />
                </span>
            )}
        </article>
    );
}