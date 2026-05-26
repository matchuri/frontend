"use client";

import { useEffect, useRef } from "react";

import { clientEnv } from "@/infrastructure/config/env";
import { loadKakaoMapScript } from "@/shared/lib/kakaoMap/loadKakaoMapScript";
import { kakaoMapViewStyles } from "@/ui/styles/kakaoMapViewStyles";
import type { KakaoMapChangeValue } from "@/features/map/domain/model/KakaoMapChangeValue";
import { getAddressFromCenter } from "@/features/map/application/utils/kakaoGeocoder";

interface KakaoMapViewProps {
    readonly centerLatitude: number;
    readonly centerLongitude: number;
    readonly level?: number;
    readonly searchKeyword?: string;
    readonly onCenterChanged?: (center: KakaoMapChangeValue) => void;
    readonly onAddressChanged?: (address: string) => void;
    readonly onSearchFailed?: () => void;
}

function createMapChangeValue(map: kakao.maps.Map): KakaoMapChangeValue {
    const center = map.getCenter();
    const bounds = map.getBounds();
    const southWest = bounds.getSouthWest();
    const northEast = bounds.getNorthEast();

    return {
        latitude: center.getLat(),
        longitude: center.getLng(),

        level: map.getLevel(),

        southWestLatitude: southWest.getLat(),
        southWestLongitude: southWest.getLng(),

        northEastLatitude: northEast.getLat(),
        northEastLongitude: northEast.getLng(),
    };
}

export default function KakaoMapView({
    centerLatitude,
    centerLongitude,
    level = 4,
    searchKeyword,
    onCenterChanged,
    onAddressChanged,
    onSearchFailed,
}: KakaoMapViewProps) {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<kakao.maps.Map | null>(null);
    const geocoderRef = useRef<kakao.maps.services.Geocoder | null>(null);
    const placesRef = useRef<kakao.maps.services.Places | null>(null);

    const onCenterChangedRef = useRef(onCenterChanged);
    const onAddressChangedRef = useRef(onAddressChanged);
    const onSearchFailedRef = useRef(onSearchFailed);

    useEffect(() => {
        onCenterChangedRef.current = onCenterChanged;
    }, [onCenterChanged]);

    useEffect(() => {
        onAddressChangedRef.current = onAddressChanged;
    }, [onAddressChanged]);

    useEffect(() => {
        onSearchFailedRef.current = onSearchFailed;
    }, [onSearchFailed]);

    useEffect(() => {
        if (!mapContainerRef.current) return;

        let cancelled = false;

        async function initializeMap() {
            await loadKakaoMapScript(clientEnv.kakaoMapAppKey);

            if (cancelled || !mapContainerRef.current || !window.kakao?.maps) {
                return;
            }

            const center = new window.kakao.maps.LatLng(
                centerLatitude,
                centerLongitude,
            );

            const map = new window.kakao.maps.Map(mapContainerRef.current, {
                center,
                level,
            });

            const geocoder = new window.kakao.maps.services.Geocoder();
            const places = new window.kakao.maps.services.Places();

            mapRef.current = map;
            geocoderRef.current = geocoder;
            placesRef.current = places;

            const notifyMapChanged = () => {
                onCenterChangedRef.current?.(createMapChangeValue(map));

                getAddressFromCenter(
                    map,
                    geocoder,
                    onAddressChangedRef.current,
                );
            };

            window.kakao.maps.event.addListener(
                map,
                "dragend",
                notifyMapChanged,
            );

            window.kakao.maps.event.addListener(
                map,
                "zoom_changed",
                notifyMapChanged,
            );

            setTimeout(() => {
                map.relayout();
                map.setCenter(center);
                notifyMapChanged();
            }, 0);
        }

        initializeMap().catch((error) => {
            console.error(error);
        });

        return () => {
            cancelled = true;
        };
    }, [centerLatitude, centerLongitude, level]);

    useEffect(() => {
        const keyword = searchKeyword?.trim();

        if (
            !keyword ||
            !mapRef.current ||
            !placesRef.current ||
            !window.kakao?.maps
        ) {
            return;
        }

        placesRef.current.keywordSearch(keyword, (result, status) => {
            if (status !== window.kakao?.maps.services.Status.OK || !result[0]) {
                onSearchFailedRef.current?.();
                return;
            }

            const searchedPlace = result[0];
            const latitude = Number(searchedPlace.y);
            const longitude = Number(searchedPlace.x);

            const nextCenter = new window.kakao.maps.LatLng(
                latitude,
                longitude,
            );

            mapRef.current?.setCenter(nextCenter);

            const nextAddress =
                searchedPlace.road_address_name ||
                searchedPlace.address_name ||
                searchedPlace.place_name;

            onAddressChangedRef.current?.(nextAddress);

            if (mapRef.current) {
                onCenterChangedRef.current?.(
                    createMapChangeValue(mapRef.current),
                );
            }
        });
    }, [searchKeyword]);

    return <div ref={mapContainerRef} className={kakaoMapViewStyles.container} />;
}