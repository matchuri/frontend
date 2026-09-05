import { httpClient } from "@/infrastructure/http/httpClient";

import type { GroupInviteExistsResponse } from "@/features/groupInviteNotification/infrastructure/api/dto/GroupInviteExistsResponse";

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
};