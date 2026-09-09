"use client";

import { useEffect, useRef, useState } from "react";
import { Crosshair } from "lucide-react";

import { clientEnv } from "@/infrastructure/config/env";
import { captureExternalSdkError } from "@/infrastructure/monitoring/sentryMonitoring";
import {
    KakaoMapSdkLoadError,
    loadKakaoMapScript,
} from "@/shared/lib/kakaoMap/loadKakaoMapScript";

import type { RecommendationRestaurant } from "@/features/recommendationRestaurant/domain/model/RecommendationRestaurant";

import { recommendationRestaurantPageStyles } from "@/ui/styles/recommendationRestaurantPageStyles";

const NORMAL_MARKER_SIZE = 34;
const SELECTED_MARKER_SIZE = 44;

function createRestaurantMarkerImage(
    selected: boolean,
) {
    const size = selected ? SELECTED_MARKER_SIZE : NORMAL_MARKER_SIZE;
    const fillColor = selected ? "#FB6F00" : "#2563EB";
    const svg = `
        <svg
            width="${size}"
            height="${size}"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M24 3C15.7 3 9 9.7 9 18c0 11 15 27 15 27s15-16 15-27C39 9.7 32.3 3 24 3Z"
                fill="${fillColor}"
                stroke="white"
                stroke-width="3"
            />
            <circle
                cx="24"
                cy="18"
                r="6"
                fill="white"
            />
        </svg>
    `;

    return new window.kakao.maps.MarkerImage(
        `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`,
        new window.kakao.maps.Size(size, size),
        {
            offset:
                new window.kakao.maps.Point(
                    size / 2,
                    size,
                ),
        },
    );
}

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
    readonly selectedRestaurant:
        RecommendationRestaurant | null;
    readonly onSelectRestaurant: (
        restaurantId: string,
    ) => void;
    readonly onClearSelection?: () => void;
    readonly sectionClassName?: string;
    readonly mapClassName?: string;

    readonly showRecenterButton?: boolean;
    readonly recenterButtonClassName?: string;
}

export default function RecommendationRestaurantMap({
    latitude,
    longitude,
    level,
    restaurants,
    selectedRestaurant,
    onSelectRestaurant,
    onClearSelection,
    sectionClassName,
    mapClassName,
    showRecenterButton = false,
    recenterButtonClassName,
}: RecommendationRestaurantMapProps) {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<kakao.maps.Map | null>(null);
    const markerRecordsRef = useRef<MarkerRecord[]>([]);

    const handleRecenter = () => {
        const map = mapRef.current;

        if (!map || !window.kakao?.maps) {
            return;
        }

        map.panTo(
            new window.kakao.maps.LatLng(
                latitude,
                longitude,
            ),
        );
    };

    const [
        mapInitializationVersion,
        setMapInitializationVersion,
    ] = useState(0);

    useEffect(() => {
        if (!mapContainerRef.current) return;

        let cancelled = false;

        async function initializeMap() {
            await loadKakaoMapScript(clientEnv.kakaoMapAppKey);

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

            setMapInitializationVersion(
                (version) => version + 1,
            );
        }

        initializeMap().catch((error) => {
            if (!(error instanceof KakaoMapSdkLoadError)) {
                captureExternalSdkError({
                    error,
                    sdk: "kakao_map",
                    operation: "map_initialization",
                    context: {mapType: "recommendation_restaurant"},
                });
            }

            console.error(error);
        });

        return () => {
            cancelled = true;
        };
    }, [latitude, level, longitude]);

    useEffect(() => {
        const map = mapRef.current;

        if (
            !map ||
            !window.kakao?.maps ||
            !onClearSelection
        ) {
            return;
        }

        window.kakao.maps.event.addListener(
            map,
            "click",
            onClearSelection,
        );
    }, [
        mapInitializationVersion,
        onClearSelection,
    ]);

    useEffect(() => {
        const map = mapRef.current;

        if (!map || !window.kakao?.maps) {
            return;
        }

        markerRecordsRef.current.forEach(
            ({ marker, infoWindow }) => {
                infoWindow?.close();
                marker.setMap(null);
            },
        );

        const bounds = new window.kakao.maps.LatLngBounds();

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
                        image:
                            createRestaurantMarkerImage(
                                false,
                            ),
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
        latitude,
        longitude,
        mapInitializationVersion,
        onSelectRestaurant,
        restaurants,
    ]);

    useEffect(() => {
        const map = mapRef.current;

        if (!map || !window.kakao?.maps) {
            return;
        }

        markerRecordsRef.current.forEach(
            (record) => {
                const isSelected =
                    selectedRestaurant?.id ===
                    record.restaurantId;

                record.marker.setImage(
                    createRestaurantMarkerImage(
                        isSelected,
                    ),
                );

                record.marker.setZIndex(
                    isSelected ? 10 : 1,
                );

                record.infoWindow?.close();
            },
        );

        if (!selectedRestaurant) {
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

        map.panTo(
            selectedMarkerRecord.position,
        );

        selectedMarkerRecord.infoWindow?.open(
            map,
            selectedMarkerRecord.marker,
        );
    }, [
        mapInitializationVersion,
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

            {showRecenterButton && (
                <button
                    type="button"
                    onClick={handleRecenter}
                    className={recenterButtonClassName}
                    aria-label="설정한 위치로 이동"
                >
                    <Crosshair
                        size={21}
                        strokeWidth={2}
                        aria-hidden="true"
                    />
                </button>
            )}
        </section>
    );
}