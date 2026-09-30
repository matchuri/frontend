import { groupInviteApi } from "@/features/group/infrastructure/api/groupInviteApi";

export async function issueGroupInviteLink(
    groupId: number,
) {
    return groupInviteApi.issueInviteLink(groupId);
}