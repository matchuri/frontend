export type GroupMemberRole = "OWNER" | "MEMBER";

export interface GroupDetailMember {
    readonly memberId: number;
    readonly nickname: string;
    readonly role: GroupMemberRole;
    readonly status: "ACTIVE";

    // 서버에서 추후 추가 예정
    readonly isMe: boolean;

    readonly joinedAt: string;
}