import type {
    MouseEvent,
    Ref,
} from "react";
import { ArrowUpRight, MapPin } from "lucide-react";

import type { RecommendationRestaurant } from "@/features/recommendationRestaurant/domain/model/RecommendationRestaurant";

import { guestRecommendationRestaurantPageStyles } from "@/ui/styles/guestRecommendationRestaurantPageStyles";

interface GuestRecommendationRestaurantCardProps {
    readonly restaurant: RecommendationRestaurant;
    readonly selected: boolean;
    readonly onSelect: () => void;
    readonly cardRef?: Ref<HTMLElement>;
}

export default function GuestRecommendationRestaurantCard({
    restaurant,
    selected,
    onSelect,
    cardRef,
}: GuestRecommendationRestaurantCardProps) {
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
                    ? guestRecommendationRestaurantPageStyles.selectedRestaurantCard
                    : guestRecommendationRestaurantPageStyles.restaurantCard
            }
        >
            <div className={guestRecommendationRestaurantPageStyles.restaurantTop}>
                <div className={guestRecommendationRestaurantPageStyles.restaurantInfo}>
                    <h3 className={guestRecommendationRestaurantPageStyles.restaurantName}>
                        {restaurant.name}
                    </h3>

                    <span className={guestRecommendationRestaurantPageStyles.restaurantDistance}>
                        {restaurant.distanceText}
                    </span>
                </div>

                <a
                    href={restaurant.placeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(event) => event.stopPropagation()}
                    className={guestRecommendationRestaurantPageStyles.placeLink}
                >
                    가게 정보

                    <ArrowUpRight
                        size={15}
                        aria-hidden="true"
                    />
                </a>
            </div>

            <p className={guestRecommendationRestaurantPageStyles.restaurantAddress}>
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