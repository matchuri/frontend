import { httpClient } from "@/infrastructure/http/httpClient";

import { isLocationRadiusMeters } from "@/features/locationSetting/domain/config/locationRadiusPolicy";

import type { LocationSetting } from "@/features/locationSetting/domain/model/LocationSetting";
import type { MemberLocationResponse } from "@/features/locationSetting/infrastructure/api/dto/MemberLocationResponse";
import type { SaveMemberLocationRequest } from "@/features/locationSetting/infrastructure/api/dto/SaveMemberLocationRequest";

import { mapMemberLocation } from "@/features/locationSetting/infrastructure/api/mapper/memberLocationMapper";
import { DEFAULT_MAP_LEVEL } from "@/features/map/domain/config/mapPolicy";

export const locationSettingApi = {
    async fetchMyLocation(): Promise<LocationSetting | null> {
        const response =
            await httpClient.get<MemberLocationResponse>(
                "/api/v1/members/me/location",
            );

        if (!response.success) {
            throw new Error(
                response.error?.message ??
                    "개인 위치 정보를 불러오지 못했습니다.",
            );
        }

        if (response.data === null) {
            return null;
        }

        return mapMemberLocation(
            response.data,
            DEFAULT_MAP_LEVEL,
        );
    },

    async saveMyLocation(
        location: LocationSetting,
    ): Promise<LocationSetting> {
        if (
            !Number.isFinite(location.radiusMeters) ||
            !isLocationRadiusMeters(
                location.radiusMeters,
            )
        ) {
            throw new Error(
                "검색 반경은 1km, 3km, 5km 중에서 선택해주세요.",
            );
        }

        const request: SaveMemberLocationRequest = {
            latitude: location.latitude,
            longitude: location.longitude,
            radiusMeters: location.radiusMeters,
            address: location.address.trim(),
        };

        const response =
            await httpClient.put<MemberLocationResponse>(
                "/api/v1/members/me/location",
                request,
            );

        if (!response.success || !response.data) {
            throw new Error(
                response.error?.message ??
                    "개인 위치 정보를 저장하지 못했습니다.",
            );
        }

        return mapMemberLocation(
            response.data,
            DEFAULT_MAP_LEVEL,
        );
    },
};