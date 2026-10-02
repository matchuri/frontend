export interface GroupInviteNotificationItemResponse {
    readonly id: number;
    readonly groupName: string;
    readonly requestMemberProfileImageUrl: string;
    readonly requestMemberNickname: string;
}

export interface GroupInviteNotificationListResponse {
    readonly success: boolean;

    readonly data: {
        readonly content:
            readonly GroupInviteNotificationItemResponse[];

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