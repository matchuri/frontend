export type GroupMemberRole = "OWNER" | "MEMBER";

export interface GroupDetailMember {
    readonly memberId: number;
    readonly nickname: string;
    readonly memberProfileImageUrl: string | null;
    readonly role: GroupMemberRole;
    readonly status: "ACTIVE";
    readonly isMe: boolean;
    readonly joinedAt: string;
}