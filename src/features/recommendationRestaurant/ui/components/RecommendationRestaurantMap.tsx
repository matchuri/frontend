"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Crosshair } from "lucide-react";

import { clientEnv } from "@/infrastructure/config/env";
import { captureExternalSdkError } from "@/infrastructure/monitoring/sentryMonitoring";
import {
    KakaoMapSdkLoadError,
    loadKakaoMapScript,
} from "@/shared/lib/kakaoMap/loadKakaoMapScript";

import type { RecommendationRestaurant } from "@/features/recommendationRestaurant/domain/model/RecommendationRestaurant";
import {
    createLocationMarkerImage,
    createRestaurantMarkerImage,
    createRestaurantNameOverlayContent,
    createRestaurantSelectionOverlayContent,
    DEFAULT_MAP_BOUNDS_PADDING,
    RESTAURANT_MARKER_COLLISION_DISTANCE_PX,
} from "@/features/recommendationRestaurant/ui/config/recommendationRestaurantMapConfig";

import { recommendationRestaurantPageStyles } from "@/ui/styles/recommendationRestaurantPageStyles";

interface RestaurantMarkerGroup {
    readonly key: string;
    readonly latitude: number;
    readonly longitude: number;
    readonly restaurants:
        readonly RecommendationRestaurant[];
}

interface MarkerRecord {
    readonly groupKey: string;
    readonly restaurantIds: readonly string[];
    readonly marker: kakao.maps.Marker;
    readonly position: kakao.maps.LatLng;
    readonly restaurantCount: number;
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

    readonly boundsPaddingTop?: number;
    readonly boundsPaddingRight?: number;
    readonly boundsPaddingBottom?: number;
    readonly boundsPaddingLeft?: number;
}

function createRestaurantMarkerGroups(
    map: kakao.maps.Map,
    restaurants:
        readonly RecommendationRestaurant[],
): RestaurantMarkerGroup[] {
    const projection = map.getProjection();

    const groups: {
        key: string;
        latitude: number;
        longitude: number;
        restaurants: RecommendationRestaurant[];
        point: kakao.maps.Point;
    }[] = [];

    restaurants.forEach((restaurant) => {
        const position =
            new window.kakao.maps.LatLng(
                restaurant.latitude,
                restaurant.longitude,
            );

        const point =
            projection.containerPointFromCoords(
                position,
            );

        const matchingGroup = groups.find(
            (group) => {
                const deltaX = group.point.x - point.x;
                const deltaY = group.point.y - point.y;

                const distance =
                    Math.sqrt(
                        deltaX * deltaX + deltaY * deltaY,
                    );

                return (
                    distance <= RESTAURANT_MARKER_COLLISION_DISTANCE_PX
                );
            },
        );

        if (matchingGroup) {
            matchingGroup.restaurants.push(
                restaurant,
            );

            return;
        }

        groups.push({
            key: `${restaurant.latitude}:${restaurant.longitude}:${restaurant.id}`,
            latitude: restaurant.latitude,
            longitude: restaurant.longitude,
            restaurants: [restaurant],
            point,
        });
    });

    return groups.map(
        ({
            key,
            latitude,
            longitude,
            restaurants: groupedRestaurants,
        }) => ({
            key,
            latitude,
            longitude,
            restaurants: groupedRestaurants,
        }),
    );
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
    boundsPaddingTop = DEFAULT_MAP_BOUNDS_PADDING,
    boundsPaddingRight = DEFAULT_MAP_BOUNDS_PADDING,
    boundsPaddingBottom = DEFAULT_MAP_BOUNDS_PADDING,
    boundsPaddingLeft = DEFAULT_MAP_BOUNDS_PADDING,
}: RecommendationRestaurantMapProps) {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<kakao.maps.Map | null>(null);
    const locationMarkerRef = useRef<kakao.maps.Marker | null>(null);
    const markerRecordsRef = useRef<MarkerRecord[]>([]);

    const selectionOverlayRef =
        useRef<kakao.maps.CustomOverlay | null>(
            null,
        );

    const selectedNameOverlayRef =
        useRef<kakao.maps.CustomOverlay | null>(
            null,
        );

    const selectedRestaurantRef =
        useRef<RecommendationRestaurant | null>(
            selectedRestaurant,
        );

    const [
        activeGroupKey,
        setActiveGroupKey,
    ] = useState<string | null>(null);

    const [
        mapInitializationVersion,
        setMapInitializationVersion,
    ] = useState(0);

    const closeSelectionOverlay = useCallback(() => {
        selectionOverlayRef.current?.setMap(null);
        selectionOverlayRef.current = null;
    }, []);

    const closeGroupSelection = useCallback(() => {
        closeSelectionOverlay();
        setActiveGroupKey(null);
    }, [closeSelectionOverlay]);

    const closeSelectedNameOverlay = useCallback(() => {
        selectedNameOverlayRef.current?.setMap(null);
        selectedNameOverlayRef.current = null;
    }, []);

    useEffect(() => {
        selectedRestaurantRef.current =
            selectedRestaurant;
    }, [selectedRestaurant]);

    const setInitialBounds = useCallback(() => {
        const map = mapRef.current;

        if (!map || !window.kakao?.maps) {
            return;
        }

        const bounds =
            new window.kakao.maps.LatLngBounds();

        bounds.extend(
            new window.kakao.maps.LatLng(
                latitude,
                longitude,
            ),
        );

        restaurants.forEach((restaurant) => {
            bounds.extend(
                new window.kakao.maps.LatLng(
                    restaurant.latitude,
                    restaurant.longitude,
                ),
            );
        });

        map.relayout();

        map.setBounds(
            bounds,
            boundsPaddingTop,
            boundsPaddingRight,
            boundsPaddingBottom,
            boundsPaddingLeft,
        );
    }, [
        latitude,
        longitude,
        restaurants,
        boundsPaddingTop,
        boundsPaddingRight,
        boundsPaddingBottom,
        boundsPaddingLeft,
    ]);

    const handleRecenter = () => {
        closeGroupSelection();
        closeSelectedNameOverlay();

        onClearSelection?.();

        setInitialBounds();
    };

    useEffect(() => {
        if (!mapContainerRef.current) {
            return;
        }

        let cancelled = false;

        async function initializeMap() {
            await loadKakaoMapScript(
                clientEnv.kakaoMapAppKey,
            );

            if (cancelled ||
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
                    context: {
                        mapType: "recommendation_restaurant",
                    },
                });
            }

            console.error(error);
        });

        return () => {
            cancelled = true;
        };
    }, [
        latitude,
        level,
        longitude,
    ]);

    useEffect(() => {
        const map = mapRef.current;

        if (!map ||
            !window.kakao?.maps ||
            !onClearSelection
        ) {
            return;
        }

        const handleMapClick = () => {
            closeGroupSelection();
            closeSelectedNameOverlay();

            onClearSelection();
        };

        window.kakao.maps.event.addListener(
            map,
            "click",
            handleMapClick,
        );

        return () => {
            window.kakao.maps.event.removeListener(
                map,
                "click",
                handleMapClick,
            );
        };
    }, [
        mapInitializationVersion,
        onClearSelection,
        closeGroupSelection,
        closeSelectedNameOverlay,
    ]);

    useEffect(() => {
        const map = mapRef.current;

        if (!map || !window.kakao?.maps) {
            return;
        }

        locationMarkerRef.current?.setMap(null);

        const locationPosition =
            new window.kakao.maps.LatLng(latitude, longitude);

        locationMarkerRef.current =
            new window.kakao.maps.Marker({
                map,
                position: locationPosition,
                image: createLocationMarkerImage(),
                clickable: true,
            });

        locationMarkerRef.current.setZIndex(20);

        return () => {
            locationMarkerRef.current?.setMap(null);
            locationMarkerRef.current = null;
        };
    }, [
        latitude,
        longitude,
        mapInitializationVersion,
    ]);

    useEffect(() => {
        const map = mapRef.current;

        if (!map || !window.kakao?.maps) {
            return;
        }

        closeSelectionOverlay();
        closeSelectedNameOverlay();

        markerRecordsRef.current.forEach(
            ({ marker }) => {
                marker.setMap(null);
            },
        );

        markerRecordsRef.current = [];

        const renderRestaurantMarkers = () => {
            markerRecordsRef.current.forEach(
                ({ marker }) => {
                    marker.setMap(null);
                },
            );

            markerRecordsRef.current = [];

            const markerGroups =
                createRestaurantMarkerGroups(
                    map,
                    restaurants,
                );

            markerRecordsRef.current =
                markerGroups.map((group) => {
                    const position =
                        new window.kakao.maps.LatLng(
                            group.latitude,
                            group.longitude,
                        );

                    const restaurantCount =
                        group.restaurants.length;

                    const isSelected =
                        selectedRestaurantRef.current
                            ? group.restaurants.some(
                                (restaurant) =>
                                    restaurant.id === selectedRestaurantRef.current?.id,
                            )
                            : false;

                    const marker =
                        new window.kakao.maps.Marker({
                            map,
                            position,
                            image:
                                createRestaurantMarkerImage(
                                    isSelected,
                                    restaurantCount,
                                ),
                            clickable: true,
                        });

                    marker.setZIndex(isSelected ? 30 : 10);

                    const handleMarkerClick =
                        () => {
                            closeSelectionOverlay();
                            closeSelectedNameOverlay();

                            if (restaurantCount === 1) {
                                setActiveGroupKey(null);

                                onSelectRestaurant(
                                    group.restaurants[0]
                                        .id,
                                );

                                return;
                            }

                            setActiveGroupKey(group.key);

                            const content =
                                createRestaurantSelectionOverlayContent(
                                    group.restaurants.map(
                                        (restaurant) => ({
                                            restaurantId: restaurant.id,
                                            restaurantName: restaurant.name,
                                        }),
                                    ),
                                    (
                                        restaurantId,
                                    ) => {
                                        closeSelectionOverlay();
                                        setActiveGroupKey(null);

                                        onSelectRestaurant(
                                            restaurantId,
                                        );
                                    },
                                );

                            const selectionOverlay =
                                new window.kakao.maps.CustomOverlay(
                                    {
                                        position,
                                        content,
                                        xAnchor: 0.5,
                                        yAnchor: 1.45,
                                        zIndex: 100,
                                        clickable: true,
                                    },
                                );

                            selectionOverlay.setMap(map);

                            selectionOverlayRef.current = selectionOverlay;
                        };

                    window.kakao.maps.event.addListener(
                        marker,
                        "click",
                        handleMarkerClick,
                    );

                    return {
                        groupKey: group.key,
                        restaurantIds:
                            group.restaurants.map(
                                (restaurant) => restaurant.id
                            ),
                        marker,
                        position,
                        restaurantCount,
                    };
                });
        };

        // 모든 음식점 좌표가 화면 안에 들어오도록 설정
        setInitialBounds();

        const handleMapIdle = () => {
            closeSelectionOverlay();
            setActiveGroupKey(null);
            renderRestaurantMarkers();
        };

        window.kakao.maps.event.addListener(
            map,
            "idle",
            handleMapIdle,
        );

        renderRestaurantMarkers();

        return () => {
            window.kakao.maps.event.removeListener(
                map,
                "idle",
                handleMapIdle,
            );

            closeSelectionOverlay();
            closeSelectedNameOverlay();

            markerRecordsRef.current.forEach(
                ({ marker }) => {
                    marker.setMap(null);
                },
            );

            markerRecordsRef.current = [];
        };
    }, [
        mapInitializationVersion,
        onSelectRestaurant,
        restaurants,
        setInitialBounds,
        closeSelectionOverlay,
        closeSelectedNameOverlay,
    ]);

    useEffect(() => {
        markerRecordsRef.current.forEach(
            (record) => {
                const isSelected =
                    selectedRestaurant
                        ? record.restaurantIds.includes(
                            selectedRestaurant.id,
                        )
                        : false;

                const isGroupSelected =
                    record.groupKey === activeGroupKey;

                record.marker.setImage(
                    createRestaurantMarkerImage(
                        isSelected || isGroupSelected,
                        record.restaurantCount,
                    ),
                );

                record.marker.setZIndex(
                    isSelected || isGroupSelected ? 30 : 10,
                );
            },
        );
    }, [
        activeGroupKey,
        selectedRestaurant,
    ]);

    useEffect(() => {
        const map = mapRef.current;

        if (!map || !window.kakao?.maps) {
            return;
        }

        closeSelectedNameOverlay();

        if (!selectedRestaurant) {
            return;
        }

        const selectedMarkerRecord =
            markerRecordsRef.current.find(
                (record) =>
                    record.restaurantIds.includes(
                        selectedRestaurant.id,
                    ),
            );

        if (!selectedMarkerRecord) {
            return;
        }

        closeSelectionOverlay();

        const overlay =
            new window.kakao.maps.CustomOverlay({
                position: selectedMarkerRecord.position,
                content:
                    createRestaurantNameOverlayContent(
                        selectedRestaurant.name,
                    ),
                xAnchor: 0.5,
                yAnchor:
                    selectedMarkerRecord.restaurantCount > 1
                        ? 2.05
                        : 2.3,
                zIndex: 50,
                clickable: false,
            });

        overlay.setMap(map);

        selectedNameOverlayRef.current = overlay;

        return () => {
            overlay.setMap(null);

            if (selectedNameOverlayRef.current === overlay) {
                selectedNameOverlayRef.current = null;
            }
        };
    }, [
        mapInitializationVersion,
        selectedRestaurant,
        closeSelectionOverlay,
        closeSelectedNameOverlay,
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
                    aria-label="최초 지도 영역으로 이동"
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