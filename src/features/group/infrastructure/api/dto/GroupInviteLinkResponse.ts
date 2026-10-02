interface GroupInviteLinkData {
    readonly groupId: number;
    readonly token: string;
    readonly expiresAt: string;
}

interface GroupInviteLinkError {
    readonly status: number;
    readonly code: string;
    readonly message: string;
    readonly details?: readonly unknown[];
}

export interface GroupInviteLinkFetchResponse {
    readonly success: boolean;
    readonly data: GroupInviteLinkData | null;
    readonly error: GroupInviteLinkError | null;
}

export interface GroupInviteLinkMutationResponse {
    readonly success: boolean;
    readonly data: GroupInviteLinkData;
    readonly error: GroupInviteLinkError | null;
}