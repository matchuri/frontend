import { httpClient } from "@/infrastructure/http/httpClient";

import type { Group } from "@/features/group/domain/model/Group";
import type { GroupListResponse } from "@/features/group/infrastructure/api/dto/GroupListResponse";
import type { GroupCreateRequest } from "@/features/group/infrastructure/api/dto/GroupCreateRequest";
import type { GroupCreateResponse } from "@/features/group/infrastructure/api/dto/GroupCreateResponse";
import type { GroupDetail } from "@/features/group/domain/model/GroupDetail";
import type { GroupDetailResponse } from "@/features/group/infrastructure/api/dto/GroupDetailResponse";
import type { GroupUpdateRequest } from "@/features/group/infrastructure/api/dto/GroupUpdateRequest";
import type { GroupUpdateResponse } from "@/features/group/infrastructure/api/dto/GroupUpdateResponse";
import type { GroupDeleteResponse } from "@/features/group/infrastructure/api/dto/GroupDeleteResponse";
import type { GroupLeaveResponse } from "@/features/group/infrastructure/api/dto/GroupLeaveResponse";

import { mapGroupListToGroups } from "@/features/group/infrastructure/api/mapper/groupListMapper";
import { mapGroupDetail } from "@/features/group/infrastructure/api/mapper/groupDetailMapper";

export const groupApi = {
    async fetchMyGroups(): Promise<readonly Group[]> {
        const response =
            await httpClient.get<GroupListResponse>(
                "/api/v1/groups",
            );

        console.log("그룹 목록 조회 응답", response);

        if (!response.success) {
            throw new Error(
                response.error?.message ??
                    "그룹 목록 조회 실패",
            );
        }

        return mapGroupListToGroups(
            response.data.content,
        );
    },

    async createGroup(
        request: GroupCreateRequest,
    ) {
        const response =
            await httpClient.post<GroupCreateResponse>(
                "/api/v1/groups",
                request,
            );

        if (!response.success) {
            throw new Error(
                response.error?.message ??
                    "그룹 생성 실패",
            );
        }

        return response.data;
    },

    async fetchGroupDetail(
        groupId: number,
    ): Promise<GroupDetail> {
        const response =
            await httpClient.get<GroupDetailResponse>(
                `/api/v1/groups/${groupId}`,
            );

        if (!response.success) {
            throw new Error(
                response.error?.message ??
                    "그룹 상세 조회 실패",
            );
        }

        return mapGroupDetail(response.data);
    },

    async updateGroup(
        groupId: number,
        request: GroupUpdateRequest,
    ) {
        const response =
            await httpClient.patch<GroupUpdateResponse>(
                `/api/v1/groups/${groupId}`,
                request,
            );

        if (!response.success) {
            throw new Error(
                response.error?.message ??
                    "그룹 수정 실패",
            );
        }
        return response.data;
    },

    async deleteGroup(groupId: number) {
        const response =
            await httpClient.delete<GroupDeleteResponse>(
                `/api/v1/groups/${groupId}`,
            );

        if (!response.success) {
            throw new Error(
                response.error?.message ??
                    "그룹 삭제에 실패했습니다.",
            );
        }

        return response.data;
    },

    async leaveGroup(groupId: number) {
        const response =
            await httpClient.post<GroupLeaveResponse>(
                `/api/v1/groups/${groupId}/leave`,
            );

        if (!response.success) {
            throw new Error(
                response.error?.message ??
                    "그룹 나가기에 실패했습니다.",
            );
        }

        return response.data;
    },
};