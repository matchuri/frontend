interface GroupInvitePreviewData {
    readonly groupName: string;
    readonly ownerNickname: string;
    readonly memberCount: number;
}

interface GroupInvitePreviewError {
    readonly status: number;
    readonly code: string;
    readonly message: string;
    readonly details: readonly unknown[];
}

export interface GroupInvitePreviewResponse {
    readonly success: boolean;
    readonly data: GroupInvitePreviewData | null;
    readonly error: GroupInvitePreviewError | null;
}