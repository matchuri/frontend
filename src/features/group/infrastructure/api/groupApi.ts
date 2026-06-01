import { httpClient } from "@/infrastructure/http/httpClient";
import type { Group } from "@/features/group/domain/model/Group";
import type { GroupListResponse } from "@/features/group/infrastructure/api/dto/GroupListResponse";
import { mapGroupListToGroups } from "@/features/group/infrastructure/api/mapper/groupListMapper";

export const groupApi = {
    async fetchMyGroups(): Promise<readonly Group[]> {
        const response = await httpClient.get<GroupListResponse>("/api/v1/groups");

        if (!response.success) {
            throw new Error(response.error?.message ?? "그룹 목록 조회 실패");
        }

        return mapGroupListToGroups(response.data.content);
    },
};