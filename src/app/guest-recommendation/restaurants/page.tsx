"use client";

import { Suspense } from "react";

import { useGuestRecommendationRestaurantContext } from "@/features/guestRecommendation/application/hooks/useGuestRecommendationRestaurantContext";
import { useRecommendationRestaurants } from "@/features/recommendationRestaurant/application/hooks/useRecommendationRestaurants";

import RecommendationRestaurantContent from "@/features/recommendationRestaurant/ui/components/RecommendationRestaurantContent";
import GuestRecommendationRestaurantSkeleton from "@/features/guestRecommendation/ui/components/GuestRecommendationRestaurantSkeleton";

import { isLocationRadiusMeters } from "@/features/locationSetting/domain/config/locationRadiusPolicy";

export default function GuestRecommendationRestaurantsPage() {
    return (
        <Suspense fallback={<GuestRecommendationRestaurantSkeleton />}>
            <GuestRecommendationRestaurantsPageContent />
        </Suspense>
    );
}

function GuestRecommendationRestaurantsPageContent() {
    const {
        location,
        selectedMenu,
        isValidContext,
        moveToResult,
    } = useGuestRecommendationRestaurantContext();

    const baseRadiusMeters =
        isLocationRadiusMeters(location.radiusMeters) ? location.radiusMeters : 1000;

    const restaurantSearch =
        useRecommendationRestaurants({
            menuName: selectedMenu?.menuName ?? "",
            latitude: location.latitude,
            longitude: location.longitude,
            baseRadiusMeters,
            selectFirstRestaurant: false,
        });

    if (!isValidContext || selectedMenu === null) {
        return <GuestRecommendationRestaurantSkeleton />;
    }

    return (
        <RecommendationRestaurantContent
            menuName={selectedMenu.menuName}
            location={location}
            onBack={moveToResult}
            {...restaurantSearch}
        />
    );
}