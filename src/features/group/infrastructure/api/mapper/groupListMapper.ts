import type { Group } from "@/features/group/domain/model/Group";
import type { GroupListItemResponse } from "@/features/group/infrastructure/api/dto/GroupListResponse";

function formatGroupCreatedAt(createdAt: string): string {
    return createdAt.slice(0, 10).replaceAll("-", ".");
}

export function mapGroupListToGroups(
    data: readonly GroupListItemResponse[],
): readonly Group[] {
    return data.map((item) => ({
        id: item.id,
        name: item.name,
        memberCount: item.memberCount,
        createdAt: formatGroupCreatedAt(item.createdAt),
        recommendationStatus: item.latestRecommendationStatus,
        isOwner: false,
    }));
}