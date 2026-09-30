import type { GroupInvitePreview } from "@/features/group/domain/model/GroupInvitePreview";

import { groupInviteApi } from "@/features/group/infrastructure/api/groupInviteApi";

export async function fetchGroupInvitePreview(
    token: string,
): Promise<GroupInvitePreview> {
    return groupInviteApi.fetchInvitePreview({
        token,
    });
}