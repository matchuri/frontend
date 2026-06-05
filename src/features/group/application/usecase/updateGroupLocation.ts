import { groupApi } from "@/features/group/infrastructure/api/groupApi";

export async function updateGroupLocation(
    groupId: number,
    latitude: number,
    longitude: number,
    level?: number,
) {
    return groupApi.updateGroup(groupId, {
        latitude,
        longitude,
        level,
    });
}