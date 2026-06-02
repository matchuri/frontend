import { groupApi } from "@/features/group/infrastructure/api/groupApi";

export async function fetchGroupDetail(
    groupId: number,
) {
    return groupApi.fetchGroupDetail(groupId);
}