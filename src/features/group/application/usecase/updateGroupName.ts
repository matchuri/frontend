import { groupApi } from "@/features/group/infrastructure/api/groupApi";

export async function updateGroupName(
    groupId: number,
    name: string,
) {
    return groupApi.updateGroup(groupId, {
        name,
    });
}