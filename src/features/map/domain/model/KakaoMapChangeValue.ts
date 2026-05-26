export interface KakaoMapChangeValue {
    readonly latitude: number;
    readonly longitude: number;

    readonly level: number;

    readonly southWestLatitude: number;
    readonly southWestLongitude: number;

    readonly northEastLatitude: number;
    readonly northEastLongitude: number;
}