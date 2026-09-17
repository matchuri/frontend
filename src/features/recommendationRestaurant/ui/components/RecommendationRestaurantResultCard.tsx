import type {
    MouseEvent,
    Ref,
} from "react";
import { ArrowUpRight, MapPin } from "lucide-react";

import type { RecommendationRestaurant } from "@/features/recommendationRestaurant/domain/model/RecommendationRestaurant";

import { recommendationRestaurantContentStyles } from "@/ui/styles/recommendationRestaurantContentStyles";

interface RecommendationRestaurantResultCardProps {
    readonly restaurant: RecommendationRestaurant;
    readonly selected: boolean;
    readonly onSelect: () => void;
    readonly cardRef?: Ref<HTMLElement>;
}

export default function RecommendationRestaurantResultCard({
    restaurant,
    selected,
    onSelect,
    cardRef,
}: RecommendationRestaurantResultCardProps) {
    const handleSelect = (
        event: MouseEvent<HTMLElement>,
    ) => {
        event.stopPropagation();
        onSelect();
    };

    return (
        <article
            ref={cardRef}
            onClick={handleSelect}
            className={
                selected
                    ? recommendationRestaurantContentStyles.selectedRestaurantCard
                    : recommendationRestaurantContentStyles.restaurantCard
            }
        >
            <div className={recommendationRestaurantContentStyles.restaurantTop}>
                <div className={recommendationRestaurantContentStyles.restaurantInfo}>
                    <h3 className={recommendationRestaurantContentStyles.restaurantName}>
                        {restaurant.name}
                    </h3>

                    <span className={recommendationRestaurantContentStyles.restaurantDistance}>
                        {restaurant.distanceText}
                    </span>
                </div>

                <a
                    href={restaurant.placeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(event) => event.stopPropagation()}
                    className={recommendationRestaurantContentStyles.placeLink}
                >
                    가게 정보

                    <ArrowUpRight
                        size={15}
                        aria-hidden="true"
                    />
                </a>
            </div>

            <p className={recommendationRestaurantContentStyles.restaurantAddress}>
                <MapPin
                    size={14}
                    strokeWidth={2}
                    className="shrink-0"
                    aria-hidden="true"
                />

                <span>
                    {restaurant.roadAddress || restaurant.address}
                </span>
            </p>
        </article>
    );
}