import { searchRecommendationRestaurants } from "@/features/recommendationRestaurant/infrastructure/kakao/searchRecommendationRestaurants";

interface FetchRecommendationRestaurantsParams {
    readonly menuName: string;
    readonly latitude: number;
    readonly longitude: number;
}

export async function fetchRecommendationRestaurants(
    params: FetchRecommendationRestaurantsParams,
) {
    return searchRecommendationRestaurants(params);
}