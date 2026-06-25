import { groupApi } from "@/features/group/infrastructure/api/groupApi";

export async function updateGroupLocation(
    groupId: number,
    latitude: number,
    longitude: number,
    address: string,
) {
    return groupApi.updateGroup(groupId, {
        latitude,
        longitude,
        radiusMeters: 1000,
        address,
    });
}