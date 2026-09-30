export interface GroupInviteLink {
    readonly groupId: number;
    readonly token: string;
    readonly expiresAt: string;
}