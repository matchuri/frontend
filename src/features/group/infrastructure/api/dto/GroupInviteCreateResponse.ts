import type { GroupInviteStatus } from "@/features/group/domain/model/GroupInvite";

export interface GroupInviteCreateResponse {
    readonly success: boolean;

    readonly data: {
        readonly inviteId: number;
        readonly groupId: number;
        readonly groupName: string;
        readonly targetMemberId: number;
        readonly targetNickname: string;
        readonly expiresAt: string;
        readonly status: GroupInviteStatus;
    };

    readonly error: {
        readonly status: number;
        readonly code: string;
        readonly message: string;
        readonly details: readonly unknown[];
    } | null;
}