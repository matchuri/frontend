import { groupApi } from "@/features/group/infrastructure/api/groupApi";

import { isLocationRadiusMeters } from "@/features/locationSetting/domain/config/locationRadiusPolicy";

import type { LocationSetting } from "@/features/locationSetting/domain/model/LocationSetting";

export async function updateGroupLocation(
    groupId: number,
    location: LocationSetting,
) {
    if (!isLocationRadiusMeters(location.radiusMeters)) {
        throw new Error(
            "검색 반경은 1km, 3km, 5km 중에서 선택해주세요.",
        );
    }

    return groupApi.updateGroup(groupId, {
        latitude: location.latitude,
        longitude: location.longitude,
        radiusMeters: location.radiusMeters,
        address: location.address.trim(),
    });
}