export interface GroupInviteExistsResponse {
    readonly success: boolean;
    readonly data: {
        readonly exists: boolean;
    };
    readonly error: {
        readonly status: number;
        readonly code: string;
        readonly message: string;
        readonly details: readonly unknown[];
    } | null;
}