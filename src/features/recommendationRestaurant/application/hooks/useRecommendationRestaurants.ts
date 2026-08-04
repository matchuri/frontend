"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { fetchRecommendationRestaurants } from "@/features/recommendationRestaurant/application/usecase/fetchRecommendationRestaurants";
import { createRestaurantSearchRadiusSteps } from "@/features/locationSetting/domain/config/locationRadiusPolicy";

import type { RecommendationRestaurant } from "@/features/recommendationRestaurant/domain/model/RecommendationRestaurant";
import type { RecommendationRestaurantSearchContext } from "@/features/recommendationRestaurant/domain/model/RecommendationRestaurantSearchContext";
import type { LocationRadiusMeters } from "@/features/locationSetting/domain/config/locationRadiusPolicy";

interface UseRecommendationRestaurantsParams {
    readonly menuName: string;
    readonly latitude: number;
    readonly longitude: number;
    readonly baseRadiusMeters: LocationRadiusMeters;
}

export function useRecommendationRestaurants({
    menuName,
    latitude,
    longitude,
    baseRadiusMeters,
}: UseRecommendationRestaurantsParams) {
    const [restaurants, setRestaurants] = useState<
        readonly RecommendationRestaurant[]
    >([]);

    const [selectedRestaurantId, setSelectedRestaurantId] =
        useState<string | null>(null);

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] =
        useState<string | null>(null);

    const [
        effectiveRadiusMeters,
        setEffectiveRadiusMeters,
    ] = useState<LocationRadiusMeters>(baseRadiusMeters);

    const requestSequenceRef = useRef(0);

    const resetSearchState = useCallback(() => {
        setRestaurants([]);
        setSelectedRestaurantId(null);
        setErrorMessage(null);
        setEffectiveRadiusMeters(baseRadiusMeters);
    }, [baseRadiusMeters]);

    const loadRestaurants = useCallback(async () => {
        if (
            !menuName.trim() ||
            !Number.isFinite(latitude) ||
            !Number.isFinite(longitude)
        ) {
            resetSearchState();
            return;
        }

        const currentRequestSequence =
            requestSequenceRef.current + 1;

        requestSequenceRef.current =
            currentRequestSequence;

        const radiusSteps =
            createRestaurantSearchRadiusSteps(
                baseRadiusMeters,
            );

        try {
            setIsLoading(true);
            resetSearchState();

            for (const radiusMeters of radiusSteps) {
                const data =
                    await fetchRecommendationRestaurants({
                        menuName,
                        latitude,
                        longitude,
                        radiusMeters,
                    });

                if (requestSequenceRef.current !== currentRequestSequence) {
                    return;
                }

                setEffectiveRadiusMeters(radiusMeters);

                if (data.length === 0) {
                    continue;
                }

                setRestaurants(data);
                setSelectedRestaurantId(
                    data[0]?.id ?? null,
                );

                return;
            }

            setRestaurants([]);
            setSelectedRestaurantId(null);
        } catch (error) {
            if (requestSequenceRef.current !== currentRequestSequence) {
                return;
            }

            setRestaurants([]);
            setSelectedRestaurantId(null);

            setErrorMessage(
                error instanceof Error
                    ? error.message
                    : "주변 맛집을 불러오지 못했습니다.",
            );
        } finally {
            if (requestSequenceRef.current === currentRequestSequence) {
                setIsLoading(false);
            }
        }
    }, [
        baseRadiusMeters,
        latitude,
        longitude,
        menuName,
        resetSearchState,
    ]);

    useEffect(() => {
        void loadRestaurants();

        return () => {
            requestSequenceRef.current += 1;
        };
    }, [loadRestaurants]);

    const selectedRestaurant =
        restaurants.find(
            (restaurant) =>
                restaurant.id === selectedRestaurantId,
        ) ?? null;

    const searchContext: RecommendationRestaurantSearchContext = {
        menuName,
        latitude,
        longitude,
        baseRadiusMeters,
        effectiveRadiusMeters,
    };

    return {
        restaurants,
        selectedRestaurant,
        selectedRestaurantId,

        searchContext,
        searchRadiusSteps:
            createRestaurantSearchRadiusSteps(
                baseRadiusMeters,
            ),

        isLoading,
        errorMessage,

        selectRestaurant: setSelectedRestaurantId,
        refetchRestaurants: loadRestaurants,
    };
}