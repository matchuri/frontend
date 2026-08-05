"use client";

import type { LocationRadiusMeters } from "@/features/locationSetting/domain/config/locationRadiusPolicy";
import { formatLocationRadius } from "@/features/locationSetting/domain/config/locationRadiusPolicy";
import type { LocationSetting } from "@/features/locationSetting/domain/model/LocationSetting";

import { DEFAULT_MAP_LEVEL } from "@/features/map/domain/config/mapPolicy";

import { useRecommendationRestaurants } from "@/features/recommendationRestaurant/application/hooks/useRecommendationRestaurants";
import RecommendationRestaurantCard from "@/features/recommendationRestaurant/ui/components/RecommendationRestaurantCard";
import RecommendationRestaurantMap from "@/features/recommendationRestaurant/ui/components/RecommendationRestaurantMap";

import { personalRecommendationResultPageStyles } from "@/ui/styles/personalRecommendationResultPageStyles";

interface PersonalRecommendationSelectedRestaurantContentProps {
    readonly menuName: string;
    readonly location: LocationSetting;
}

export default function PersonalRecommendationSelectedRestaurantContent({
    menuName,
    location,
}: PersonalRecommendationSelectedRestaurantContentProps) {
    const baseRadiusMeters =
        location.radiusMeters as LocationRadiusMeters;

    const {
        restaurants,
        selectedRestaurant,
        selectedRestaurantId,
        searchContext,
        isLoading,
        errorMessage,
        selectRestaurant,
    } = useRecommendationRestaurants({
        menuName,
        latitude: location.latitude,
        longitude: location.longitude,
        baseRadiusMeters,
    });

    return (
        <section
            className={
                personalRecommendationResultPageStyles.restaurantSection
            }
        >
            <div
                className={
                    personalRecommendationResultPageStyles.restaurantHeader
                }
            >
                <div>
                    <h2
                        className={
                            personalRecommendationResultPageStyles.restaurantTitle
                        }
                    >
                        {menuName} 주변 맛집
                    </h2>

                    <p
                        className={
                            personalRecommendationResultPageStyles.restaurantDescription
                        }
                    >
                        {location.address}
                    </p>
                </div>

                <span
                    className={
                        personalRecommendationResultPageStyles.restaurantRadius
                    }
                >
                    검색 반경{" "}
                    {formatLocationRadius(
                        searchContext.effectiveRadiusMeters,
                    )}
                </span>
            </div>

            {isLoading && (
                <div
                    className={
                        personalRecommendationResultPageStyles.messageBox
                    }
                >
                    주변 맛집을 불러오는 중입니다.
                </div>
            )}

            {errorMessage && (
                <div
                    className={
                        personalRecommendationResultPageStyles.errorBox
                    }
                >
                    {errorMessage}
                </div>
            )}

            {!isLoading &&
                !errorMessage &&
                restaurants.length === 0 && (
                    <div
                        className={
                            personalRecommendationResultPageStyles.messageBox
                        }
                    >
                        설정한 검색 반경 내에서 주변 맛집을 찾지
                        못했습니다.
                    </div>
                )}

            {!errorMessage && (
                <div
                    className={
                        personalRecommendationResultPageStyles.restaurantLayout
                    }
                >
                    <div
                        className={
                            personalRecommendationResultPageStyles.restaurantList
                        }
                    >
                        {!isLoading &&
                            restaurants.map((restaurant) => (
                                <RecommendationRestaurantCard
                                    key={restaurant.id}
                                    restaurant={restaurant}
                                    selected={
                                        restaurant.id ===
                                        selectedRestaurantId
                                    }
                                    onClick={() =>
                                        selectRestaurant(
                                            restaurant.id,
                                        )
                                    }
                                />
                            ))}
                    </div>

                    <RecommendationRestaurantMap
                        latitude={location.latitude}
                        longitude={location.longitude}
                        level={DEFAULT_MAP_LEVEL}
                        restaurants={restaurants}
                        selectedRestaurant={selectedRestaurant}
                        onSelectRestaurant={selectRestaurant}
                        sectionClassName={
                            personalRecommendationResultPageStyles.restaurantMapArea
                        }
                        mapClassName={
                            personalRecommendationResultPageStyles.restaurantMap
                        }
                    />
                </div>
            )}
        </section>
    );
}