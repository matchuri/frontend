import type { GroupInviteNotificationItem } from "@/features/groupInviteNotification/domain/model/GroupInviteNotificationItem";
import type { GroupInviteNotificationItemResponse } from "@/features/groupInviteNotification/infrastructure/api/dto/GroupInviteNotificationListResponse";

export function mapGroupInviteNotificationItem(
    response: GroupInviteNotificationItemResponse,
): GroupInviteNotificationItem {
    return {
        id: response.id,
        groupName: response.groupName,
        requestMemberProfileImageUrl: response.requestMemberProfileImageUrl,
        requestMemberNickname: response.requestMemberNickname,
    };
}

export function mapGroupInviteNotificationList(
    responses: readonly GroupInviteNotificationItemResponse[],
): readonly GroupInviteNotificationItem[] {
    return responses.map(
        mapGroupInviteNotificationItem,
    );
}