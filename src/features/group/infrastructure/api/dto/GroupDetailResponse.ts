export interface GroupDetailResponse {
    readonly success: boolean;

    readonly data: {
        readonly id: number;
        readonly name: string;
        readonly inviteCode: string;
        readonly latitude: number;
        readonly longitude: number;
        readonly radiusMeters: number;
        readonly address: string | null;

        readonly status: "ACTIVE";

        readonly members: readonly {
            readonly memberId: number;
            readonly nickname: string;
            readonly role: "OWNER" | "MEMBER";
            readonly status: "ACTIVE";
            readonly joinedAt: string;
            readonly isMe: boolean;
        }[];

        readonly activeRecommendation: {
            readonly sessionId: number;

            readonly status:
                | "PREPARING"
                | "OPEN"
                | "CLOSED";

            readonly readiness: {
                readonly totalMemberCount: number;
                readonly readyMemberCount: number;
                readonly allReady: boolean;
            } | null;
        } | null;
    };

    readonly error: {
        readonly status: number;
        readonly code: string;
        readonly message: string;
        readonly details: readonly unknown[];
    } | null;
}