interface GroupInviteJoinData {
    readonly groupId: number;
    readonly memberStatus: "ACTIVE";
}

interface GroupInviteJoinError {
    readonly status: number;
    readonly code: string;
    readonly message: string;
    readonly details: readonly unknown[];
}

export interface GroupInviteJoinResponse {
    readonly success: boolean;
    readonly data: GroupInviteJoinData | null;
    readonly error: GroupInviteJoinError | null;
}