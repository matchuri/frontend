"use client";

import { useCallback, useEffect, useState } from "react";

import type { RecommendationRestaurant } from "@/features/recommendationRestaurant/domain/model/RecommendationRestaurant";
import { fetchRecommendationRestaurants } from "@/features/recommendationRestaurant/application/usecase/fetchRecommendationRestaurants";

interface UseRecommendationRestaurantsParams {
    readonly menuName: string;
    readonly latitude: number;
    readonly longitude: number;
}

export function useRecommendationRestaurants({
    menuName,
    latitude,
    longitude,
}: UseRecommendationRestaurantsParams) {
    const [restaurants, setRestaurants] = useState<
        readonly RecommendationRestaurant[]
    >([]);
    const [selectedRestaurantId, setSelectedRestaurantId] =
        useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const loadRestaurants = useCallback(async () => {
        if (
            !menuName ||
            !Number.isFinite(latitude) ||
            !Number.isFinite(longitude)
        ) {
            setRestaurants([]);
            return;
        }

        try {
            setIsLoading(true);
            setErrorMessage(null);

            const data = await fetchRecommendationRestaurants({
                menuName,
                latitude,
                longitude,
            });

            setRestaurants(data);
            setSelectedRestaurantId(data[0]?.id ?? null);
        } catch (error) {
            setErrorMessage(
                error instanceof Error
                    ? error.message
                    : "주변 맛집을 불러오지 못했습니다.",
            );
        } finally {
            setIsLoading(false);
        }
    }, [latitude, longitude, menuName]);

    useEffect(() => {
        loadRestaurants();
    }, [loadRestaurants]);

    const selectedRestaurant =
        restaurants.find(
            (restaurant) => restaurant.id === selectedRestaurantId,
        ) ?? null;

    return {
        restaurants,
        selectedRestaurant,
        selectedRestaurantId,
        isLoading,
        errorMessage,
        selectRestaurant: setSelectedRestaurantId,
        refetchRestaurants: loadRestaurants,
    };
}