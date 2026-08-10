export interface LocationSetting {
    readonly address: string;

    readonly latitude: number;
    readonly longitude: number;

    // 주변 맛집 검색 반경
    readonly radiusMeters: number;

    // 카카오 지도 화면 확대 단계(서버에는 저장x 프론트엔드 전용 값)
    readonly level: number;
}