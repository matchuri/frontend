import { MapPin, Phone } from "lucide-react";

import type { RecommendationRestaurant } from "@/features/recommendationRestaurant/domain/model/RecommendationRestaurant";
import { recommendationRestaurantPageStyles } from "@/ui/styles/recommendationRestaurantPageStyles";

interface RecommendationRestaurantCardProps {
    readonly restaurant: RecommendationRestaurant;
    readonly selected: boolean;
    readonly onClick: () => void;
}

export default function RecommendationRestaurantCard({
    restaurant,
    selected,
    onClick,
}: RecommendationRestaurantCardProps) {
    const address = restaurant.roadAddress || restaurant.address;

    return (
        <article
            onClick={onClick}
            className={
                selected
                    ? recommendationRestaurantPageStyles.selectedRestaurantCard
                    : recommendationRestaurantPageStyles.restaurantCard
            }
        >
            <div className={recommendationRestaurantPageStyles.restaurantInfo}>
                <h2 className={recommendationRestaurantPageStyles.restaurantName}>
                    {restaurant.name}
                </h2>

                <p className={recommendationRestaurantPageStyles.restaurantDistance}>
                    {restaurant.distanceText}
                </p>

                {address && (
                    <p className={recommendationRestaurantPageStyles.restaurantAddress}>
                        <MapPin size={14} />
                        <span>{address}</span>
                    </p>
                )}

                {restaurant.phone && (
                    <p className={recommendationRestaurantPageStyles.restaurantPhone}>
                        <Phone size={14} />
                        <span>{restaurant.phone}</span>
                    </p>
                )}
            </div>
        </article>
    );
}