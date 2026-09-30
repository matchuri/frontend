import { groupInviteApi } from "@/features/group/infrastructure/api/groupInviteApi";

export async function fetchGroupInviteLink(
    groupId: number,
) {
    return groupInviteApi.fetchInviteLink(groupId);
}