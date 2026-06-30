export interface GroupInviteRespondResponse {
    readonly success: boolean;

    readonly data: {
        readonly inviteId: number;
        readonly groupId: number;
        readonly inviteStatus: string;
        readonly memberStatus: string;
        readonly respondedAt: string;
    };

    readonly error: {
        readonly status: number;
        readonly code: string;
        readonly message: string;
        readonly details: readonly unknown[];
    } | null;
}