import type { GroupRecommendationStatus } from "@/features/group/domain/model/GroupRecommendationStatus";

export interface GroupListItemResponse {
    readonly id: number;
    readonly name: string;
    readonly status: "ACTIVE";
    readonly memberCount: number;
    readonly latestRecommendationStatus: GroupRecommendationStatus;
    readonly createdAt: string;
}

export interface GroupListResponse {
    readonly success: boolean;
    readonly data: {
        readonly content: readonly GroupListItemResponse[];
        readonly pageInfo: {
            readonly page: number;
            readonly size: number;
            readonly totalElements: number;
            readonly totalPages: number;
            readonly first: boolean;
            readonly last: boolean;
            readonly hasNext: boolean;
            readonly hasPrevious: boolean;
        };
    };
    readonly error: {
        readonly status: number;
        readonly code: string;
        readonly message: string;
        readonly details: readonly unknown[];
    } | null;
}