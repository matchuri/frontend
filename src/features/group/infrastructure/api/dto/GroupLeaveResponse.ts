export interface GroupLeaveResponse {
    readonly success: boolean;

    readonly data: {
        readonly groupId: number;
        readonly memberStatus: "LEFT";
        readonly leftAt: string;
    };

    readonly error: {
        readonly status: number;
        readonly code: string;
        readonly message: string;
        readonly details: readonly unknown[];
    } | null;
}