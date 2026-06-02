import type { LocationSetting } from "@/features/locationSetting/domain/model/LocationSetting";
import type { GroupCreateRequest } from "@/features/group/infrastructure/api/dto/GroupCreateRequest";

import { groupApi } from "@/features/group/infrastructure/api/groupApi";

function createRequest(
    groupName: string,
    location: LocationSetting,
): GroupCreateRequest {
    return {
        name: groupName,

        latitude: location.latitude,
        longitude: location.longitude,

        // 현재 서버에서 미사용. 추후 확장 고려
        level: location.level,

        southWestLatitude:
            location.southWestLatitude,

        southWestLongitude:
            location.southWestLongitude,

        northEastLatitude:
            location.northEastLatitude,

        northEastLongitude:
            location.northEastLongitude,
    };
}

export async function createGroup(
    groupName: string,
    location: LocationSetting,
) {
    const request = createRequest(
        groupName,
        location,
    );

    return groupApi.createGroup(request);
}