import { MapPin } from "lucide-react";

import type { RecommendationRestaurant } from "@/features/recommendationRestaurant/domain/model/RecommendationRestaurant";
import { recommendationRestaurantPageStyles } from "@/ui/styles/recommendationRestaurantPageStyles";

interface RecommendationRestaurantMapPlaceholderProps {
    readonly latitude: number;
    readonly longitude: number;
    readonly level: number;
    readonly restaurants: readonly RecommendationRestaurant[];
}

export default function RecommendationRestaurantMapPlaceholder({
    latitude,
    longitude,
    level,
    restaurants,
}: RecommendationRestaurantMapPlaceholderProps) {
    return (
        <section className={recommendationRestaurantPageStyles.mapArea}>
            <div className={recommendationRestaurantPageStyles.mapInfoBox}>
                <strong>지도 영역</strong>
                <span>
                    기준 위치: {latitude}, {longitude}
                </span>
                <span>level: {level}</span>
            </div>

            {restaurants.map((restaurant, index) => (
                <span
                    key={restaurant.id}
                    className={recommendationRestaurantPageStyles.mockMarker}
                    style={{
                        left: `${35 + index * 8}%`,
                        top: `${35 + (index % 3) * 10}%`,
                    }}
                >
                    <MapPin size={34} fill="currentColor" />
                </span>
            ))}
        </section>
    );
}