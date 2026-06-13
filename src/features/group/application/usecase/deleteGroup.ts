import { groupApi } from "@/features/group/infrastructure/api/groupApi";

export async function deleteGroup(
    groupId: number,
) {
    return groupApi.deleteGroup(groupId);
}