import type { GroupInvite } from "@/features/group/domain/model/GroupInvite";
import type { GroupInviteCreatedEvent } from "@/features/group/infrastructure/sse/dto/GroupInviteCreatedEvent";

export function mapInviteCreatedEventToModel(
    event: GroupInviteCreatedEvent,
): GroupInvite {
    return {
        inviteId: event.payload.inviteId,
        groupId: event.payload.groupId,
        groupName: event.payload.groupName,
        requestMemberId: event.payload.requestMemberId,
        requestMemberNickname: event.payload.requestMemberNickname,
        status: "PENDING",
        expiresAt: event.payload.expiresAt,
        createdAt: event.occurredAt,
    };
}