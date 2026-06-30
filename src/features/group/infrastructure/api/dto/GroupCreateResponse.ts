export interface GroupCreateResponse {
    readonly success: boolean;

    readonly data: {
        readonly groupId: number;
        readonly inviteCode: string;
        readonly status: "ACTIVE";
    };

    readonly error: {
        readonly status: number;
        readonly code: string;
        readonly message: string;
        readonly details: readonly unknown[];
    } | null;
}