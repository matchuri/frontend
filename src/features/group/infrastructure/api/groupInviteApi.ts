import { httpClient } from "@/infrastructure/http/httpClient";

import type { GroupInvite } from "@/features/group/domain/model/GroupInvite";
import type { GroupInviteListResponse } from "@/features/group/infrastructure/api/dto/GroupInviteListResponse";

import { mapGroupInviteListToModel } from "@/features/group/infrastructure/api/mapper/groupInviteMapper";

export const groupInviteApi = {
    async fetchMyInvites(): Promise<readonly GroupInvite[]> {
        const response =
            await httpClient.get<GroupInviteListResponse>(
                "/api/v1/groups/invites/me",
            );

        if (!response.success) {
            throw new Error(
                response.error?.message ??
                    "받은 초대 목록 조회 실패",
            );
        }

        return mapGroupInviteListToModel(
            response.data.content,
        );
    },
};