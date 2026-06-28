"use client";

import { useEffect, useRef } from "react";

import { clientEnv } from "@/infrastructure/config/env";
import { loadKakaoMapScript } from "@/shared/lib/kakaoMap/loadKakaoMapScript";
import type { RecommendationRestaurant } from "@/features/recommendationRestaurant/domain/model/RecommendationRestaurant";
import { recommendationRestaurantPageStyles } from "@/ui/styles/recommendationRestaurantPageStyles";

interface MarkerRecord {
    readonly restaurantId: string;
    readonly marker: kakao.maps.Marker;
    readonly infoWindow?: kakao.maps.InfoWindow;
    readonly position: kakao.maps.LatLng;
}

interface RecommendationRestaurantMapProps {
    readonly latitude: number;
    readonly longitude: number;
    readonly level: number;
    readonly restaurants: readonly RecommendationRestaurant[];
    readonly selectedRestaurant: RecommendationRestaurant | null;
    readonly onSelectRestaurant: (restaurantId: string) => void;
}

export default function RecommendationRestaurantMap({
    latitude,
    longitude,
    level,
    restaurants,
    selectedRestaurant,
    onSelectRestaurant,
}: RecommendationRestaurantMapProps) {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<kakao.maps.Map | null>(null);
    const markerRecordsRef = useRef<MarkerRecord[]>([]);

    useEffect(() => {
        if (!mapContainerRef.current) return;

        let cancelled = false;

        async function initializeMap() {
            await loadKakaoMapScript(clientEnv.kakaoMapAppKey);

            if (cancelled || !mapContainerRef.current || !window.kakao?.maps) {
                return;
            }

            const center = new window.kakao.maps.LatLng(latitude, longitude);

            mapRef.current = new window.kakao.maps.Map(
                mapContainerRef.current,
                {
                    center,
                    level,
                },
            );
        }

        initializeMap();

        return () => {
            cancelled = true;
        };
    }, [latitude, level, longitude]);

    useEffect(() => {
        const map = mapRef.current;

        if (!map || !window.kakao?.maps) {
            return;
        }

        markerRecordsRef.current.forEach(({ marker, infoWindow }) => {
            infoWindow?.close();
            marker.setMap(null);
        });

        markerRecordsRef.current = restaurants.map((restaurant) => {
            const position = new window.kakao.maps.LatLng(
                restaurant.latitude,
                restaurant.longitude,
            );

            const marker = new window.kakao.maps.Marker({
                map,
                position,
            });

            const infoWindow = new window.kakao.maps.InfoWindow({
                content: `
                    <div
                        style="
                            padding:6px 10px;
                            font-size:13px;
                            font-weight:500;
                            color:#000000;
                            white-space:nowrap;
                        "
                    >
                        ${restaurant.name}
                    </div>
                `,
            });

            window.kakao.maps.event.addListener(marker, "click", () => {
                onSelectRestaurant(restaurant.id);
                map.panTo(position);

                markerRecordsRef.current.forEach((record) => {
                    record.infoWindow?.close();
                });

                infoWindow.open(map, marker);
            });

            return {
                restaurantId: restaurant.id,
                marker,
                infoWindow,
                position,
            };
        });

        return () => {
            markerRecordsRef.current.forEach(({ marker, infoWindow }) => {
                infoWindow?.close();
                marker.setMap(null);
            });

            markerRecordsRef.current = [];
        };
    }, [onSelectRestaurant, restaurants]);

    useEffect(() => {
        const map = mapRef.current;

        if (!map || !selectedRestaurant) {
            return;
        }

        const selectedMarkerRecord = markerRecordsRef.current.find(
            (record) => record.restaurantId === selectedRestaurant.id,
        );

        if (!selectedMarkerRecord) {
            return;
        }

        markerRecordsRef.current.forEach((record) => {
            record.infoWindow?.close();
        });

        map.panTo(selectedMarkerRecord.position);

        selectedMarkerRecord.infoWindow?.open(
            map,
            selectedMarkerRecord.marker,
        );
    }, [selectedRestaurant]);

    return (
        <section className={recommendationRestaurantPageStyles.mapArea}>
            <div
                ref={mapContainerRef}
                className={recommendationRestaurantPageStyles.mapContainer}
            />
        </section>
    );
}