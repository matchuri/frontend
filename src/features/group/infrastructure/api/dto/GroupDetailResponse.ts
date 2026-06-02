export interface GroupDetailResponse {
    readonly success: boolean;

    readonly data: {
        readonly id: number;
        readonly name: string;
        readonly inviteCode: string;
        readonly latitude: number;
        readonly longitude: number;

        // TODO: 추후 서버 추가 예정
        readonly level?: number;
        readonly address?: string;

        readonly status: "ACTIVE";

        readonly members: readonly {
            readonly memberId: number;
            readonly nickname: string;
            readonly role: "OWNER" | "MEMBER";
            readonly status: "ACTIVE";
            readonly joinedAt: string;
            readonly isMe?: boolean; // TODO: 추후 서버 추가 예정
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
            };
        } | null;
    };

    readonly error: {
        readonly status: number;
        readonly code: string;
        readonly message: string;
        readonly details: readonly unknown[];
    } | null;
}