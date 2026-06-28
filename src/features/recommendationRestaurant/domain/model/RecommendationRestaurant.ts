export interface RecommendationRestaurant {
    readonly id: string;
    readonly name: string;
    readonly distanceText: string;
    readonly latitude: number;
    readonly longitude: number;
    readonly address: string;
    readonly roadAddress: string;
    readonly phone: string;
    readonly placeUrl: string;
}