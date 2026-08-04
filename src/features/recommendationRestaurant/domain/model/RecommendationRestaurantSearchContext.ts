import type { LocationRadiusMeters } from "@/features/locationSetting/domain/config/locationRadiusPolicy";

export interface RecommendationRestaurantSearchContext {
    readonly menuName: string;

    readonly latitude: number;
    readonly longitude: number;

    // 서버에 저장된 개인 또는 그룹 위치의 기본 반경
    // 자동 확장 결과로 변경하지 않음
    readonly baseRadiusMeters: LocationRadiusMeters;

    // 현재 카카오 맛집 검색에 실제 적용 중인 반경
    readonly effectiveRadiusMeters: LocationRadiusMeters;
}