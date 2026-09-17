import type { Ref } from "react";

import { ArrowUpRight, MapPin } from "lucide-react";

import type { RecommendationRestaurant } from "@/features/recommendationRestaurant/domain/model/RecommendationRestaurant";

import { personalRecommendationResultPageStyles } from "@/ui/styles/personalRecommendationResultPageStyles";

interface PersonalRecommendationRestaurantCardProps {
    readonly restaurant: RecommendationRestaurant;
    readonly selected: boolean;
    readonly onSelect: () => void;
    readonly cardRef?: Ref<HTMLElement>;
}

export default function PersonalRecommendationRestaurantCard({
    restaurant,
    selected,
    onSelect,
    cardRef,
}: PersonalRecommendationRestaurantCardProps) {
    return (
        <article
            ref={cardRef}
            onClick={onSelect}
            className={
                selected
                    ? personalRecommendationResultPageStyles.selectedRestaurantCard
                    : personalRecommendationResultPageStyles.restaurantCard
            }
        >
            <div className={personalRecommendationResultPageStyles.restaurantCardTop}>
                <div className={personalRecommendationResultPageStyles.restaurantInfo}>
                    <h3 className={personalRecommendationResultPageStyles.restaurantName}>
                        {restaurant.name}
                    </h3>

                    <span className={personalRecommendationResultPageStyles.restaurantDistance}>
                        {restaurant.distanceText}
                    </span>
                </div>

                <a
                    href={restaurant.placeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(event) => event.stopPropagation()}
                    className={personalRecommendationResultPageStyles.placeLink}
                >
                    가게 정보

                    <ArrowUpRight
                        size={15}
                        aria-hidden="true"
                    />
                </a>
            </div>

            <p className={personalRecommendationResultPageStyles.restaurantAddress}>
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