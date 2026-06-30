import { httpClient } from "@/infrastructure/http/httpClient";

import type { GroupInvite } from "@/features/group/domain/model/GroupInvite";
import type { GroupInviteResponseType } from "@/features/group/domain/model/GroupInviteResponseType";

import type { GroupInviteListResponse } from "@/features/group/infrastructure/api/dto/GroupInviteListResponse";
import type { GroupInviteCreateRequest } from "@/features/group/infrastructure/api/dto/GroupInviteCreateRequest";
import type { GroupInviteCreateResponse } from "@/features/group/infrastructure/api/dto/GroupInviteCreateResponse";
import type { GroupInviteRespondRequest } from "@/features/group/infrastructure/api/dto/GroupInviteRespondRequest";
import type { GroupInviteRespondResponse } from "@/features/group/infrastructure/api/dto/GroupInviteRespondResponse";

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

        return mapGroupInviteListToModel(response.data.content);
    },

    async createInviteByNickname(
        request: GroupInviteCreateRequest,
    ) {
        const response =
            await httpClient.post<GroupInviteCreateResponse>(
                "/api/v1/groups/invites/nickname",
                request,
            );

        return response.data;
    },

    async respondInvite(
        inviteId: number,
        responseType: GroupInviteResponseType,
    ) {
        const response =
            await httpClient.post<GroupInviteRespondResponse>(
                `/api/v1/groups/invites/${inviteId}/response`,
                {
                    responseType,
                } satisfies GroupInviteRespondRequest,
            );

        return response.data;
    },
};