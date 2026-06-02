export interface GroupDetailMember {
    readonly id: number;
    readonly nickname: string;
    readonly role: "OWNER" | "MEMBER";
}

export interface GroupDetailPanel {
    readonly id: number;
    readonly name: string;
    readonly address: string;
    readonly inviteCode: string;
    readonly members: readonly GroupDetailMember[];
}