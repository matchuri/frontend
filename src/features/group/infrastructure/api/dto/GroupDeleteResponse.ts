export interface GroupDeleteResponse {
    readonly success: boolean;

    readonly data: {
        readonly groupId: number;
        readonly status: "DELETED";
        readonly deletedAt: string;
    };

    readonly error: {
        readonly status: number;
        readonly code: string;
        readonly message: string;
        readonly details: readonly unknown[];
    } | null;
}