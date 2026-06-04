import type { GroupInviteResponseType } from "@/features/group/domain/model/GroupInviteResponseType";

import { groupInviteApi } from "@/features/group/infrastructure/api/groupInviteApi";

export async function respondGroupInvite(
    inviteId: number,
    responseType: GroupInviteResponseType,
) {
    return groupInviteApi.respondInvite(
        inviteId,
        responseType,
    );
}