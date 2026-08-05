import { searchRecommendationRestaurants } from "@/features/recommendationRestaurant/infrastructure/kakao/searchRecommendationRestaurants";

import type { LocationRadiusMeters } from "@/features/locationSetting/domain/config/locationRadiusPolicy";

interface FetchRecommendationRestaurantsParams {
    readonly menuName: string;
    readonly latitude: number;
    readonly longitude: number;
    readonly radiusMeters: LocationRadiusMeters;
}

export async function fetchRecommendationRestaurants(
    params: FetchRecommendationRestaurantsParams,
) {
    return searchRecommendationRestaurants(params);
}