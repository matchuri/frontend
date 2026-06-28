export interface RecommendationRestaurant {
    readonly id: number;
    readonly name: string;
    readonly distanceText: string;
    readonly rating: number | null;
    readonly latitude: number;
    readonly longitude: number;
}