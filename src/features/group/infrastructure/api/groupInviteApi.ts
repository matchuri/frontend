import { httpClient } from "@/infrastructure/http/httpClient";

import type { GroupInvite } from "@/features/group/domain/model/GroupInvite";
import type { GroupInviteLink } from "@/features/group/domain/model/GroupInviteLink";
import type { GroupInvitePreview } from "@/features/group/domain/model/GroupInvitePreview";
import type { GroupInviteResponseType } from "@/features/group/domain/model/GroupInviteResponseType";

import type { GroupInviteListResponse } from "@/features/group/infrastructure/api/dto/GroupInviteListResponse";
import type { GroupInviteCreateRequest } from "@/features/group/infrastructure/api/dto/GroupInviteCreateRequest";
import type { GroupInviteCreateResponse } from "@/features/group/infrastructure/api/dto/GroupInviteCreateResponse";
import type { GroupInviteRespondRequest } from "@/features/group/infrastructure/api/dto/GroupInviteRespondRequest";
import type { GroupInviteRespondResponse } from "@/features/group/infrastructure/api/dto/GroupInviteRespondResponse";
import type {
    GroupInviteLinkFetchResponse,
    GroupInviteLinkMutationResponse,
} from "@/features/group/infrastructure/api/dto/GroupInviteLinkResponse";
import type { GroupInvitePreviewRequest } from "@/features/group/infrastructure/api/dto/GroupInvitePreviewRequest";
import type { GroupInvitePreviewResponse } from "@/features/group/infrastructure/api/dto/GroupInvitePreviewResponse";

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

    async fetchInviteLink(
        groupId: number,
    ): Promise<GroupInviteLink | null> {
        const response =
            await httpClient.get<GroupInviteLinkFetchResponse>(
                `/api/v1/groups/${groupId}/invite-link`,
            );

        if (!response.success) {
            throw new Error(
                response.error?.message ??
                    "그룹 초대 링크 조회에 실패했습니다.",
            );
        }

        return response.data;
    },

    async issueInviteLink(
        groupId: number,
    ): Promise<GroupInviteLink> {
        const response =
            await httpClient.post<GroupInviteLinkMutationResponse>(
                `/api/v1/groups/${groupId}/invite-link`,
            );

        if (!response.success) {
            throw new Error(
                response.error?.message ??
                    "그룹 초대 링크 발급에 실패했습니다.",
            );
        }

        return response.data;
    },

    async reissueInviteLink(
        groupId: number,
    ): Promise<GroupInviteLink> {
        const response =
            await httpClient.post<GroupInviteLinkMutationResponse>(
                `/api/v1/groups/${groupId}/invite-link/reissue`,
            );

        if (!response.success) {
            throw new Error(
                response.error?.message ??
                    "그룹 초대 링크 재발급에 실패했습니다.",
            );
        }

        return response.data;
    },

    async fetchInvitePreview(
        request: GroupInvitePreviewRequest,
    ): Promise<GroupInvitePreview> {
        const response =
            await httpClient.post<GroupInvitePreviewResponse>(
                "/api/v1/groups/invite-links/preview",
                request,
            );

        if (!response.success || !response.data) {
            throw new Error(
                response.error?.message ??
                    "그룹 초대 정보를 불러오지 못했습니다.",
            );
        }

        return response.data;
    },
};