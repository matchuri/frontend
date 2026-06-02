import type {
    GroupInviteItemResponse,
} from "@/features/group/infrastructure/api/dto/GroupInviteListResponse";

import type { GroupInvite } from "@/features/group/domain/model/GroupInvite";

export function mapGroupInviteToModel(
    response: GroupInviteItemResponse,
): GroupInvite {
    return {
        inviteId: response.inviteId,
        groupId: response.groupId,
        groupName: response.groupName,
        requestMemberId: response.requestMemberId,
        requestMemberNickname: response.requestMemberNickname,
        status: response.status,
        expiresAt: response.expiresAt,
        createdAt: response.createdAt,
    };
}

export function mapGroupInviteListToModel(
    responses: readonly GroupInviteItemResponse[],
): readonly GroupInvite[] {
    return responses.map(mapGroupInviteToModel);
}