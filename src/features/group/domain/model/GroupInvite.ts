export type GroupInviteStatus = "PENDING";

export interface GroupInvite {
    readonly inviteId: number;
    readonly groupId: number;
    readonly groupName: string;
    readonly requestMemberId: number;
    readonly requestMemberNickname: string;
    readonly status: GroupInviteStatus;
    readonly expiresAt: string;
    readonly createdAt: string;
}