"use client";

import {
    useEffect,
    useRef,
    useState,
} from "react";

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
    readonly restaurants:
        readonly RecommendationRestaurant[];
    readonly selectedRestaurant:
        RecommendationRestaurant | null;
    readonly onSelectRestaurant: (
        restaurantId: string,
    ) => void;
    readonly sectionClassName?: string;
    readonly mapClassName?: string;
}

export default function RecommendationRestaurantMap({
    latitude,
    longitude,
    level,
    restaurants,
    selectedRestaurant,
    onSelectRestaurant,
    sectionClassName,
    mapClassName,
}: RecommendationRestaurantMapProps) {
    const mapContainerRef =
        useRef<HTMLDivElement | null>(null);

    const mapRef =
        useRef<kakao.maps.Map | null>(null);

    const markerRecordsRef =
        useRef<MarkerRecord[]>([]);

    const [isMapReady, setIsMapReady] =
        useState(false);

    useEffect(() => {
        if (!mapContainerRef.current) {
            return;
        }

        let cancelled = false;

        async function initializeMap() {
            setIsMapReady(false);

            await loadKakaoMapScript(
                clientEnv.kakaoMapAppKey,
            );

            if (
                cancelled ||
                !mapContainerRef.current ||
                !window.kakao?.maps
            ) {
                return;
            }

            const center =
                new window.kakao.maps.LatLng(
                    latitude,
                    longitude,
                );

            mapRef.current =
                new window.kakao.maps.Map(
                    mapContainerRef.current,
                    {
                        center,
                        level,
                    },
                );

            setIsMapReady(true);
        }

        void initializeMap();

        return () => {
            cancelled = true;
            setIsMapReady(false);

            markerRecordsRef.current.forEach(
                ({ marker, infoWindow }) => {
                    infoWindow?.close();
                    marker.setMap(null);
                },
            );

            markerRecordsRef.current = [];
            mapRef.current = null;
        };
    }, [
        latitude,
        level,
        longitude,
    ]);

    useEffect(() => {
        const map = mapRef.current;

        if (
            !isMapReady ||
            !map ||
            !window.kakao?.maps
        ) {
            return;
        }

        markerRecordsRef.current.forEach(
            ({ marker, infoWindow }) => {
                infoWindow?.close();
                marker.setMap(null);
            },
        );

        const bounds =
            new window.kakao.maps.LatLngBounds();

        bounds.extend(
            new window.kakao.maps.LatLng(
                latitude,
                longitude,
            ),
        );

        markerRecordsRef.current =
            restaurants.map((restaurant) => {
                const position =
                    new window.kakao.maps.LatLng(
                        restaurant.latitude,
                        restaurant.longitude,
                    );

                bounds.extend(position);

                const marker =
                    new window.kakao.maps.Marker({
                        map,
                        position,
                    });

                const infoWindow =
                    new window.kakao.maps.InfoWindow({
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

                window.kakao.maps.event.addListener(
                    marker,
                    "click",
                    () => {
                        onSelectRestaurant(
                            restaurant.id,
                        );

                        map.panTo(position);

                        markerRecordsRef.current.forEach(
                            (record) => {
                                record.infoWindow?.close();
                            },
                        );

                        infoWindow.open(
                            map,
                            marker,
                        );
                    },
                );

                return {
                    restaurantId:
                        restaurant.id,
                    marker,
                    infoWindow,
                    position,
                };
            });

        if (restaurants.length > 0) {
            map.setBounds(bounds);
        }

        return () => {
            markerRecordsRef.current.forEach(
                ({ marker, infoWindow }) => {
                    infoWindow?.close();
                    marker.setMap(null);
                },
            );

            markerRecordsRef.current = [];
        };
    }, [
        isMapReady,
        latitude,
        longitude,
        onSelectRestaurant,
        restaurants,
    ]);

    useEffect(() => {
        const map = mapRef.current;

        if (
            !isMapReady ||
            !map ||
            !selectedRestaurant
        ) {
            return;
        }

        const selectedMarkerRecord =
            markerRecordsRef.current.find(
                (record) =>
                    record.restaurantId ===
                    selectedRestaurant.id,
            );

        if (!selectedMarkerRecord) {
            return;
        }

        markerRecordsRef.current.forEach(
            (record) => {
                record.infoWindow?.close();
            },
        );

        map.panTo(
            selectedMarkerRecord.position,
        );

        selectedMarkerRecord.infoWindow?.open(
            map,
            selectedMarkerRecord.marker,
        );
    }, [
        isMapReady,
        selectedRestaurant,
    ]);

    return (
        <section
            className={
                sectionClassName ??
                recommendationRestaurantPageStyles.mapArea
            }
        >
            <div
                ref={mapContainerRef}
                className={
                    mapClassName ??
                    recommendationRestaurantPageStyles.mapContainer
                }
            />
        </section>
    );
}