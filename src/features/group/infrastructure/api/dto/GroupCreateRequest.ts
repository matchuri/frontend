export interface GroupCreateRequest {
    readonly name: string;

    readonly latitude: number;
    readonly longitude: number;

    // 현재 서버 미사용
    //추후 위치 범위 저장 확장 고려
    readonly level?: number;

    readonly southWestLatitude?: number;
    readonly southWestLongitude?: number;

    readonly northEastLatitude?: number;
    readonly northEastLongitude?: number;
}