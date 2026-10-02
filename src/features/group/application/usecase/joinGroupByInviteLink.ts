import type { GroupInviteJoinResult } from "@/features/group/domain/model/GroupInviteJoinResult";

import { groupInviteApi } from "@/features/group/infrastructure/api/groupInviteApi";

export async function joinGroupByInviteLink(
    token: string,
): Promise<GroupInviteJoinResult> {
    return groupInviteApi.joinByInviteLink({
        token,
    });
}