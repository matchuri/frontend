import { groupInviteApi } from "@/features/group/infrastructure/api/groupInviteApi";

export async function createGroupInviteByNickname(
    groupId: number,
    nickname: string,
) {
    return groupInviteApi.createInviteByNickname({
        groupId,
        nickname,
    });
}