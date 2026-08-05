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
    readonly onClickChangeLocation: () => void;
}

export default function PersonalRecommendationSelectedRestaurantContent({
    menuName,
    location,
    onClickChangeLocation,
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

                    {isExpandedSearch && (
                        <p
                            className={
                                personalRecommendationResultPageStyles.expandedSearchText
                            }
                        >
                            기본 반경{" "}
                            {formatLocationRadius(
                                searchContext.baseRadiusMeters,
                            )}
                            에서 결과가 없어 검색 범위를 넓혔습니다.
                        </p>
                    )}
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

            {hasNoRestaurants &&
                hasReachedMaximumRadius && (
                    <div
                        className={
                            personalRecommendationResultPageStyles.emptyRestaurantBox
                        }
                    >
                        <p>
                            설정한 최대 반경 내에서 맛집을 찾지
                            못했어요.
                        </p>

                        <button
                            type="button"
                            onClick={onClickChangeLocation}
                            className={
                                personalRecommendationResultPageStyles.changeLocationButton
                            }
                        >
                            위치 변경
                        </button>
                    </div>
                )}

            {!isLoading &&
                !errorMessage &&
                restaurants.length > 0 && (
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
                            {restaurants.map((restaurant) => (
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