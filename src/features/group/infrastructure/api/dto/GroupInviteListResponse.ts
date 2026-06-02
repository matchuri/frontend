import type { GroupInviteStatus } from "@/features/group/domain/model/GroupInvite";

export interface GroupInviteItemResponse {
    readonly inviteId: number;
    readonly groupId: number;
    readonly groupName: string;
    readonly requestMemberId: number;
    readonly requestMemberNickname: string;
    readonly status: GroupInviteStatus;
    readonly expiresAt: string;
    readonly createdAt: string;
}

export interface GroupInviteListResponse {
    readonly success: boolean;
    readonly data: {
        readonly content: readonly GroupInviteItemResponse[];
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