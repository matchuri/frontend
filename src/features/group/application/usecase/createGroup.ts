import type { LocationSetting } from "@/features/locationSetting/domain/model/LocationSetting";
import type { GroupCreateRequest } from "@/features/group/infrastructure/api/dto/GroupCreateRequest";

import { isLocationRadiusMeters } from "@/features/locationSetting/domain/config/locationRadiusPolicy";

import { groupApi } from "@/features/group/infrastructure/api/groupApi";

function createRequest(
    groupName: string,
    location: LocationSetting,
): GroupCreateRequest {
    if (!isLocationRadiusMeters(location.radiusMeters)) {
        throw new Error(
            "검색 반경은 1km, 3km, 5km 중에서 선택해주세요.",
        );
    }

    return {
        name: groupName,

        latitude: location.latitude,
        longitude: location.longitude,

        radiusMeters: location.radiusMeters,
        address: location.address.trim(),
    };
}

export async function createGroup(
    groupName: string,
    location: LocationSetting,
) {
    const request = createRequest(groupName, location);

    return groupApi.createGroup(request);
}