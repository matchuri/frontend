"use client";

import { useEffect, useRef } from "react";

import { clientEnv } from "@/infrastructure/config/env";
import { loadKakaoMapScript } from "@/shared/lib/kakaoMap/loadKakaoMapScript";
import { kakaoMapViewStyles } from "@/ui/styles/kakaoMapViewStyles";

interface KakaoMapCenter {
    readonly latitude: number;
    readonly longitude: number;
}

interface KakaoMapViewProps {
    readonly centerLatitude: number; // 초기 중심 위도
    readonly centerLongitude: number; // 초기 중심 경도
    readonly level?: number; // 지도 줌 레벨
    readonly onCenterChanged?: (center: KakaoMapCenter) => void;
}

export default function KakaoMapView({
    centerLatitude,
    centerLongitude,
    level = 4,
    onCenterChanged,
}: KakaoMapViewProps) {
    const mapContainerRef = useRef<HTMLDivElement | null>(null); // 지도 DOM div를 참조
    const mapRef = useRef<kakao.maps.Map | null>(null); // 생성된 카카오 지도 객체를 저장

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

            mapRef.current = map;

            window.kakao.maps.event.addListener(map, "dragend", () => {
                const nextCenter = map.getCenter();

                onCenterChanged?.({
                    latitude: nextCenter.getLat(),
                    longitude: nextCenter.getLng(),
                });
            });

            setTimeout(() => {
                map.relayout();
                map.setCenter(center);
            }, 0);
        }

        initializeMap().catch((error) => {
            console.error(error);
        });

        return () => {
            cancelled = true;
        };
    }, [centerLatitude, centerLongitude, level, onCenterChanged]);

    return <div ref={mapContainerRef} className={kakaoMapViewStyles.container} />;
}