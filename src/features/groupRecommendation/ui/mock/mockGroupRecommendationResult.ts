type GroupRecommendationResultStatus = "OPEN" | "FINALIZED";

export const mockGroupRecommendationResult = {
    sessionId: 5001,
    status: "OPEN" as GroupRecommendationResultStatus,
    readiness: null,

    candidates: [
        {
            candidateId: 8001,
            menuId: 1001,
            menuName: "비빔밥",
            rankNo: 1,
            score: 91.5,
            voteCount: 3,
        },
        {
            candidateId: 8002,
            menuId: 1002,
            menuName: "돈까스",
            rankNo: 2,
            score: 84,
            voteCount: 1,
        },
        {
            candidateId: 8003,
            menuId: 1003,
            menuName: "쌀국수",
            rankNo: 3,
            score: 79.5,
            voteCount: 0,
        },
    ],

    voteProgress: {
        totalMemberCount: 4,
        votedMemberCount: 3,
    },

    finalCandidate: null,

    createdAt: "2026-05-06T12:05:00",

    members: [
        { memberId: 1, nickname: "김철수", isMe: true, voted: false },
        { memberId: 2, nickname: "김덕배", isMe: false, voted: false },
        { memberId: 3, nickname: "도쿠", isMe: false, voted: true },
        { memberId: 4, nickname: "돈나룸마", isMe: false, voted: true },
//         { memberId: 5, nickname: "포든", isMe: false, voted: true },
//         { memberId: 6, nickname: "홀란드", isMe: false, voted: true },
    ],

    isOwner: true,
} as const;