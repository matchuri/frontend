import { HttpError, httpClient } from "@/infrastructure/http/httpClient";

import type { LocationSetting } from "@/features/locationSetting/domain/model/LocationSetting";
import type { MemberLocationResponse } from "@/features/locationSetting/infrastructure/api/dto/MemberLocationResponse";
import type { SaveMemberLocationRequest } from "@/features/locationSetting/infrastructure/api/dto/SaveMemberLocationRequest";

import { mapMemberLocation } from "@/features/locationSetting/infrastructure/api/mapper/memberLocationMapper";

const MEMBER_LOCATION_NOT_FOUND = "MEMBER_LOCATION_NOT_FOUND";
const DEFAULT_RADIUS_METERS = 1000;
const DEFAULT_MAP_LEVEL = 4;

export const locationSettingApi = {
    async fetchMyLocation(): Promise<LocationSetting | null> {
        try {
            const response = await httpClient.get<MemberLocationResponse>(
                "/api/v1/members/me/location",
            );

            if (!response.success || !response.data) {
                throw new Error(
                    response.error?.message ??
                        "개인 위치 정보를 불러오지 못했습니다.",
                );
            }

            return mapMemberLocation(
                response.data,
                DEFAULT_MAP_LEVEL,
            );
        } catch (error) {
            if (
                error instanceof HttpError &&
                error.body?.error?.code ===
                    MEMBER_LOCATION_NOT_FOUND
            ) {
                return null;
            }

            throw error;
        }
    },

    async saveMyLocation(
        location: LocationSetting,
    ): Promise<LocationSetting> {
        const request: SaveMemberLocationRequest = {
            latitude: location.latitude,
            longitude: location.longitude,
            radiusMeters: DEFAULT_RADIUS_METERS,
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