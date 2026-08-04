import { groupApi } from "@/features/group/infrastructure/api/groupApi";

import type { LocationSetting } from "@/features/locationSetting/domain/model/LocationSetting";

export async function updateGroupLocation(
    groupId: number,
    location: LocationSetting,
) {
    return groupApi.updateGroup(groupId, {
        latitude: location.latitude,
        longitude: location.longitude,
        radiusMeters: location.radiusMeters,
        address: location.address.trim(),
    });
}