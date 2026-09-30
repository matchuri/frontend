import { groupInviteApi } from "@/features/group/infrastructure/api/groupInviteApi";

export async function reissueGroupInviteLink(
    groupId: number,
) {
    return groupInviteApi.reissueInviteLink(groupId);
}