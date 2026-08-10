import { clientEnv } from "@/infrastructure/config/env";
import { captureExternalSdkError } from "@/infrastructure/monitoring/sentryMonitoring";
import { loadKakaoMapScript } from "@/shared/lib/kakaoMap/loadKakaoMapScript";

import type { RecommendationRestaurant } from "@/features/recommendationRestaurant/domain/model/RecommendationRestaurant";
import type { LocationRadiusMeters } from "@/features/locationSetting/domain/config/locationRadiusPolicy";

interface SearchRecommendationRestaurantsParams {
    readonly menuName: string;
    readonly latitude: number;
    readonly longitude: number;
    readonly radiusMeters: LocationRadiusMeters;
}

function formatDistance(distance?: string) {
    if (!distance) {
        return "거리 정보 없음";
    }

    const distanceNumber = Number(distance);

    if (!Number.isFinite(distanceNumber)) {
        return "거리 정보 없음";
    }

    if (distanceNumber >= 1000) {
        return `${(distanceNumber / 1000).toFixed(1)}km`;
    }

    return `${distanceNumber}m`;
}

export async function searchRecommendationRestaurants({
    menuName,
    latitude,
    longitude,
    radiusMeters,
}: SearchRecommendationRestaurantsParams): Promise<
    readonly RecommendationRestaurant[]
> {
    await loadKakaoMapScript(clientEnv.kakaoMapAppKey);

    return new Promise((resolve, reject) => {
        if (!window.kakao?.maps?.services) {
            const error = new Error(
                "카카오 지도 서비스를 불러오지 못했습니다.",
            );

            captureExternalSdkError({
                error,
                sdk: "kakao_map",
                operation: "services_initialization",
            });

            reject(error);
            return;
        }

        try {
            const places =
                new window.kakao.maps.services.Places();

            const location = new window.kakao.maps.LatLng(
                latitude,
                longitude,
            );

            places.keywordSearch(
                `${menuName} 맛집`,
                (result, status) => {
                    if (
                        status ===
                        window.kakao?.maps.services.Status.ZERO_RESULT
                    ) {
                        resolve([]);
                        return;
                    }

                    if (
                        status !==
                        window.kakao?.maps.services.Status.OK
                    ) {
                        const error = new Error(
                            "주변 맛집 검색에 실패했습니다.",
                        );

                        captureExternalSdkError({
                            error,
                            sdk: "kakao_map",
                            operation: "place_search",
                            status,
                            context: {
                                radiusMeters,
                            },
                        });

                        reject(error);
                        return;
                    }

                    resolve(
                        result.map((place) => ({
                            id: place.id,
                            name: place.place_name,
                            distanceText: formatDistance(
                                place.distance,
                            ),
                            latitude: Number(place.y),
                            longitude: Number(place.x),
                            address: place.address_name,
                            roadAddress:
                                place.road_address_name,
                            phone: place.phone,
                            placeUrl: place.place_url,
                        })),
                    );
                },
                {
                    location,
                    radius: radiusMeters,
                    sort: window.kakao.maps.services.SortBy.DISTANCE,
                },
            );
        } catch (error) {
            captureExternalSdkError({
                error,
                sdk: "kakao_map",
                operation: "place_search",
                context: {
                    radiusMeters,
                },
            });

            reject(error);
        }
    });
}