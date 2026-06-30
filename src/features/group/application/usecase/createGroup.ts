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

        radiusMeters: 1000,
        address: location.address,
    };
}

export async function createGroup(
    groupName: string,
    location: LocationSetting,
) {
    const request = createRequest(groupName, location);

    return groupApi.createGroup(request);
}