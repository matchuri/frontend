export interface GroupRecommendationSessionDetailResponse {
    readonly success: boolean;

    readonly data: {
        readonly sessionId: number;
        readonly status: "PREPARING" | "OPEN" | "FINALIZED";
        readonly readiness: {
            readonly totalMemberCount: number;
            readonly readyMemberCount: number;
            readonly allReady: boolean;
        } | null;
        readonly candidates: readonly {
            readonly candidateId: number;
            readonly menuId: number;
            readonly menuName: string;
            readonly rankNo: number;
            readonly score: number;
            readonly voteCount: number;
        }[];
        readonly voteProgress: {
            readonly totalMemberCount: number;
            readonly votedMemberCount: number;
        } | null;
        readonly finalCandidate: {
            readonly candidateId: number;
            readonly menuId: number;
            readonly menuName: string;
            readonly rankNo: number;
            readonly score: number;
            readonly voteCount: number;
        } | null;
        readonly memberVotes: readonly {
            readonly memberId: number;
            readonly nickname: string;
            readonly role: "OWNER" | "MEMBER";
            readonly isMe: boolean;
            readonly voted: boolean;
            readonly candidateId: number | null;
        }[];
        readonly createdAt: string;
    };

    readonly error: {
        readonly status: number;
        readonly code: string;
        readonly message: string;
        readonly details: readonly unknown[];
    } | null;
}