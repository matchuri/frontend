"use client";

import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import RecommendationRestaurantCard from "@/features/recommendationRestaurant/ui/components/RecommendationRestaurantCard";
import RecommendationRestaurantMap from "@/features/recommendationRestaurant/ui/components/RecommendationRestaurantMap";
import { useRecommendationRestaurants } from "@/features/recommendationRestaurant/application/hooks/useRecommendationRestaurants";

import LocationModal from "@/features/locationSetting/ui/components/LocationModal";
import GroupLocationEditModal from "@/features/group/ui/components/GroupLocationEditModal";

import { useLocationSetting } from "@/features/locationSetting/application/hooks/useLocationSetting";
import { useUpdateGroupLocation } from "@/features/group/application/hooks/useUpdateGroupLocation";

import type { LocationSetting } from "@/features/locationSetting/domain/model/LocationSetting";

import {
    DEFAULT_LOCATION_RADIUS_METERS,
    formatLocationRadius,
    isLocationRadiusMeters,
} from "@/features/locationSetting/domain/config/locationRadiusPolicy";

import { personalRecommendationSearchRadiusStorage } from "@/features/personalRecommendation/infrastructure/storage/personalRecommendationSearchRadiusStorage";

import { recommendationRestaurantPageStyles } from "@/ui/styles/recommendationRestaurantPageStyles";

export default function RecommendationRestaurantPageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const menuName = searchParams.get("menuName") ?? "추천 메뉴";
    const latitude = Number(searchParams.get("latitude"));
    const longitude = Number(searchParams.get("longitude"));
    const address = searchParams.get("address") ?? "";
    const level = Number(searchParams.get("level") ?? 4);

    const radiusMetersParam = Number(
        searchParams.get("radiusMeters"),
    );

    const baseRadiusMeters = isLocationRadiusMeters(
        radiusMetersParam,
    )
        ? radiusMetersParam
        : DEFAULT_LOCATION_RADIUS_METERS;

    const source = searchParams.get("source") ?? "personal";
    const isGroupRecommendation = source === "group";

    const groupId = Number(
        searchParams.get("groupId"),
    );

    const requestId = Number(
        searchParams.get("requestId"),
    );

    const candidateId = Number(
        searchParams.get("candidateId"),
    );

    const [currentLocation, setCurrentLocation] =
        useState<LocationSetting>({
            latitude,
            longitude,
            address,
            radiusMeters: baseRadiusMeters,
            level,
        });

    const [
        isLocationModalOpen,
        setIsLocationModalOpen,
    ] = useState(false);

    const {
        isSaving: isPersonalLocationSaving,
        saveLocation,
    } = useLocationSetting();

    const {
        isUpdating: isGroupLocationUpdating,
        update: updateGroupLocation,
        clearMessage: clearGroupLocationMessage,
    } = useUpdateGroupLocation();

    const currentBaseRadiusMeters =
        isLocationRadiusMeters(
            currentLocation.radiusMeters,
        )
            ? currentLocation.radiusMeters
            : DEFAULT_LOCATION_RADIUS_METERS;

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
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        baseRadiusMeters: currentBaseRadiusMeters,
    });

    useEffect(() => {
        const isPersonalCandidateSearch =
            source === "personal" &&
            Number.isInteger(requestId) &&
            requestId > 0 &&
            Number.isInteger(candidateId) &&
            candidateId > 0;

        if (
            !isPersonalCandidateSearch ||
            isLoading
        ) {
            return;
        }

        if (
            errorMessage !== null ||
            restaurants.length === 0
        ) {
            personalRecommendationSearchRadiusStorage.remove(
                requestId,
                candidateId,
            );

            return;
        }

        personalRecommendationSearchRadiusStorage.save({
            requestId,
            candidateId,
            radiusMeters:
                searchContext.effectiveRadiusMeters,
        });
    }, [
        candidateId,
        errorMessage,
        isLoading,
        requestId,
        restaurants.length,
        searchContext.effectiveRadiusMeters,
        source,
    ]);

    const handleOpenLocationModal = () => {
        if (
            isGroupRecommendation &&
            !Number.isFinite(groupId)
        ) {
            alert("그룹 정보를 확인할 수 없습니다.");
            return;
        }

        clearGroupLocationMessage();
        setIsLocationModalOpen(true);
    };

    const handleSavePersonalLocation = async (
        nextLocation: LocationSetting,
    ) => {
        const isSaved =
            await saveLocation(nextLocation);

        if (!isSaved) {
            return false;
        }

        setCurrentLocation(nextLocation);
        setIsLocationModalOpen(false);

        return true;
    };

    const handleSaveGroupLocation = async (
        nextLocation: LocationSetting,
    ) => {
        if (!Number.isFinite(groupId)) {
            return;
        }

        await updateGroupLocation(
            groupId,
            nextLocation,
        );

        setCurrentLocation(nextLocation);
        setIsLocationModalOpen(false);
    };

    if (
        !Number.isFinite(currentLocation.latitude) ||
        !Number.isFinite(currentLocation.longitude)
    ) {
        return (
            <main className={recommendationRestaurantPageStyles.container}>
                <section className={recommendationRestaurantPageStyles.listSection}>
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className={recommendationRestaurantPageStyles.backButton}
                    >
                        <ArrowLeft
                            size={30}
                            strokeWidth={2.5}
                        />
                    </button>

                    <div className={recommendationRestaurantPageStyles.messageBox}>
                        위치 정보가 없어 맛집을 조회할 수 없습니다.
                    </div>
                </section>
            </main>
        );
    }

    return (
        <>
            <main className={recommendationRestaurantPageStyles.container}>
                <section className={recommendationRestaurantPageStyles.listSection}>
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className={recommendationRestaurantPageStyles.backButton}
                    >
                        <ArrowLeft size={26} />
                    </button>

                    <div className={recommendationRestaurantPageStyles.titleSection}>
                        <h1 className={recommendationRestaurantPageStyles.title}>
                            {isGroupRecommendation
                                ? "투표 결과"
                                : `${menuName} 맛집`}
                        </h1>

                        {isGroupRecommendation && (
                            <p
                                className={
                                    recommendationRestaurantPageStyles.selectedMenuText
                                }
                            >
                                선정 메뉴: {menuName}
                            </p>
                        )}

                        <p
                            className={
                                recommendationRestaurantPageStyles.searchLocationText
                            }
                        >
                            {currentLocation.address}
                        </p>

                        <p
                            className={
                                recommendationRestaurantPageStyles.searchRadiusText
                            }
                        >
                            검색 반경{" "}
                            {formatLocationRadius(
                                searchContext.effectiveRadiusMeters,
                            )}
                        </p>

                        {isExpandedSearch && (
                            <p
                                className={
                                    recommendationRestaurantPageStyles.expandedSearchText
                                }
                            >
                                기본 반경{" "}
                                {formatLocationRadius(
                                    searchContext.baseRadiusMeters,
                                )}
                                에서 결과가 없어 검색 범위를
                                넓혔습니다.
                            </p>
                        )}
                    </div>

                    {isLoading && (
                        <div className={recommendationRestaurantPageStyles.messageBox}>
                            주변 맛집을 불러오는 중...
                        </div>
                    )}

                    {errorMessage && (
                        <div className={recommendationRestaurantPageStyles.errorBox}>
                            {errorMessage}
                        </div>
                    )}

                    {hasNoRestaurants &&
                        hasReachedMaximumRadius && (
                            <div
                                className={
                                    recommendationRestaurantPageStyles.emptyResultBox
                                }
                            >
                                <p>
                                    설정한 최대 반경 내에서 맛집을
                                    찾지 못했어요.
                                </p>

                                <button
                                    type="button"
                                    onClick={
                                        handleOpenLocationModal
                                    }
                                    className={
                                        recommendationRestaurantPageStyles.changeLocationButton
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
                                    recommendationRestaurantPageStyles.restaurantList
                                }
                            >
                                {restaurants.map(
                                    (restaurant) => (
                                        <RecommendationRestaurantCard
                                            key={restaurant.id}
                                            restaurant={
                                                restaurant
                                            }
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
                                    ),
                                )}
                            </div>
                        )}
                </section>

                <RecommendationRestaurantMap
                    latitude={
                        currentLocation.latitude
                    }
                    longitude={
                        currentLocation.longitude
                    }
                    level={currentLocation.level}
                    restaurants={restaurants}
                    selectedRestaurant={
                        selectedRestaurant
                    }
                    onSelectRestaurant={
                        selectRestaurant
                    }
                />
            </main>

            {!isGroupRecommendation && (
                <LocationModal
                    isOpen={isLocationModalOpen}
                    initialLocation={currentLocation}
                    isSaving={
                        isPersonalLocationSaving
                    }
                    onClose={() =>
                        setIsLocationModalOpen(false)
                    }
                    onSave={
                        handleSavePersonalLocation
                    }
                />
            )}

            {isGroupRecommendation &&
                isLocationModalOpen && (
                    <GroupLocationEditModal
                        location={currentLocation}
                        isUpdating={
                            isGroupLocationUpdating
                        }
                        onClose={() =>
                            setIsLocationModalOpen(false)
                        }
                        onSubmit={
                            handleSaveGroupLocation
                        }
                    />
                )}
        </>
    );
}