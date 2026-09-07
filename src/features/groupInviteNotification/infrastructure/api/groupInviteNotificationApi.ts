import { httpClient } from "@/infrastructure/http/httpClient";

import type { GroupInviteNotificationItem } from "@/features/groupInviteNotification/domain/model/GroupInviteNotificationItem";

import type { GroupInviteExistsResponse } from "@/features/groupInviteNotification/infrastructure/api/dto/GroupInviteExistsResponse";
import type { GroupInviteNotificationListResponse } from "@/features/groupInviteNotification/infrastructure/api/dto/GroupInviteNotificationListResponse";

import { mapGroupInviteNotificationList } from "@/features/groupInviteNotification/infrastructure/api/mapper/groupInviteNotificationMapper";

export const groupInviteNotificationApi = {
    async fetchInviteExists(): Promise<boolean> {
        const response =
            await httpClient.get<GroupInviteExistsResponse>(
                "/api/v1/invites/me/exists",
            );

        if (!response.success || !response.data) {
            throw new Error(
                response.error?.message ??
                    "그룹 초대 존재 여부 조회 실패",
            );
        }

        return response.data.exists;
    },

    async fetchInvites(): Promise<
        readonly GroupInviteNotificationItem[]
    > {
        const response =
            await httpClient.get<GroupInviteNotificationListResponse>(
                "/api/v2/invites/me",
            );

        if (!response.success || !response.data) {
            throw new Error(
                response.error?.message ??
                    "그룹 초대 목록 조회 실패",
            );
        }

        return mapGroupInviteNotificationList(
            response.data.content,
        );
    },
};