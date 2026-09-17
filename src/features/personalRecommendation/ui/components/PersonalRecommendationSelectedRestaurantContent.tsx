"use client";

import { useEffect, useRef } from "react";

import type { LocationRadiusMeters } from "@/features/locationSetting/domain/config/locationRadiusPolicy";
import { formatLocationRadius } from "@/features/locationSetting/domain/config/locationRadiusPolicy";
import type { LocationSetting } from "@/features/locationSetting/domain/model/LocationSetting";

import { DEFAULT_MAP_LEVEL } from "@/features/map/domain/config/mapPolicy";

import { useRecommendationRestaurants } from "@/features/recommendationRestaurant/application/hooks/useRecommendationRestaurants";
import PersonalRecommendationRestaurantCard from "@/features/personalRecommendation/ui/components/PersonalRecommendationRestaurantCard";
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
    const restaurantCardRefs = useRef<Record<string, HTMLElement | null>>({});

    const baseRadiusMeters =
        location.radiusMeters as LocationRadiusMeters;

    const {
        restaurants,
        selectedRestaurant,
        selectedRestaurantId,
        searchContext,
        isLoading,
        errorMessage,
        isExpandedSearch,
        hasNoRestaurants,
        hasReachedMaximumRadius,
        selectRestaurant,
    } = useRecommendationRestaurants({
        menuName,
        latitude: location.latitude,
        longitude: location.longitude,
        baseRadiusMeters,
    });

    useEffect(() => {
        if (selectedRestaurantId === null) {
            return;
        }

        const selectedCard =
            restaurantCardRefs.current[selectedRestaurantId];

        if (!selectedCard) {
            return;
        }

        selectedCard.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
        });
    }, [selectedRestaurantId]);

    return (
        <section className={personalRecommendationResultPageStyles.restaurantSection}>
            <div className={personalRecommendationResultPageStyles.restaurantHeader}>
                <h2 className={personalRecommendationResultPageStyles.restaurantTitle}>
                    {menuName} 주변 맛집
                </h2>

                <div className={personalRecommendationResultPageStyles.restaurantLocationRow}>
                    <p className={personalRecommendationResultPageStyles.restaurantDescription}>
                        {location.address}
                    </p>

                    <span className={personalRecommendationResultPageStyles.restaurantRadius}>
                        검색 반경{" "}
                        {formatLocationRadius(
                            searchContext.effectiveRadiusMeters,
                        )}
                    </span>
                </div>

                {isExpandedSearch && (
                    <p className={personalRecommendationResultPageStyles.expandedSearchText}>
                        기본 반경{" "}
                        {formatLocationRadius(
                            searchContext.baseRadiusMeters,
                        )}
                        에서 결과가 없어 검색 범위를 넓혔습니다.
                    </p>
                )}
            </div>

            {isLoading && (
                <div className={personalRecommendationResultPageStyles.messageBox}>
                    주변 맛집을 불러오는 중입니다.
                </div>
            )}

            {errorMessage && (
                <div className={personalRecommendationResultPageStyles.errorBox}>
                    {errorMessage}
                </div>
            )}

            {hasNoRestaurants &&
                hasReachedMaximumRadius && (
                    <div className={personalRecommendationResultPageStyles.emptyRestaurantBox}>
                        <p>
                            설정한 최대 반경 내에서 맛집을 찾지 못했어요.
                        </p>
                    </div>
                )
            }

            {!isLoading &&
                !errorMessage &&
                restaurants.length > 0 && (
                    <div className={personalRecommendationResultPageStyles.restaurantLayout}>
                        <RecommendationRestaurantMap
                            latitude={location.latitude}
                            longitude={location.longitude}
                            level={DEFAULT_MAP_LEVEL}
                            restaurants={restaurants}
                            selectedRestaurant={selectedRestaurant}
                            onSelectRestaurant={selectRestaurant}
                            sectionClassName={personalRecommendationResultPageStyles.restaurantMapArea}
                            mapClassName={personalRecommendationResultPageStyles.restaurantMap}
                        />

                        <div className={personalRecommendationResultPageStyles.restaurantList}>
                            {restaurants.map((restaurant) => (
                                <PersonalRecommendationRestaurantCard
                                    key={restaurant.id}
                                    restaurant={restaurant}
                                    selected={
                                        restaurant.id ===
                                        selectedRestaurantId
                                    }
                                    onSelect={() =>
                                        selectRestaurant(
                                            restaurant.id,
                                        )
                                    }
                                    cardRef={(element) => {
                                        restaurantCardRefs.current[restaurant.id] = element;
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                )}
        </section>
    );
}