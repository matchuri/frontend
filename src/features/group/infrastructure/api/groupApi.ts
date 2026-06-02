import { httpClient } from "@/infrastructure/http/httpClient";

import type { Group } from "@/features/group/domain/model/Group";
import type { GroupListResponse } from "@/features/group/infrastructure/api/dto/GroupListResponse";
import type { GroupCreateRequest } from "@/features/group/infrastructure/api/dto/GroupCreateRequest";
import type { GroupCreateResponse } from "@/features/group/infrastructure/api/dto/GroupCreateResponse";

import { mapGroupListToGroups } from "@/features/group/infrastructure/api/mapper/groupListMapper";

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
};