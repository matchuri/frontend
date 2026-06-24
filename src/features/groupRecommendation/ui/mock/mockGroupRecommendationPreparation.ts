export const mockGroupRecommendationPreparation = {
    sessionId: 5001,
    group: {
        name: "맛집 탐방 모임",
        createdAt: "2026.03.14",
        address: "서울 서초동 서초구 118",
        memberCount: 4,
    },
    readiness: {
        totalMemberCount: 4,
        readyMemberCount: 2,
    },
    members: [
        {
            memberId: 1,
            nickname: "김철수",
            isMe: true,
            isReady: false,
        },
        {
            memberId: 2,
            nickname: "김덕배",
            isMe: false,
            isReady: true,
        },
        {
            memberId: 3,
            nickname: "도쿠",
            isMe: false,
            isReady: true,
        },
        {
            memberId: 4,
            nickname: "묻마는 내친구",
            isMe: false,
            isReady: false,
        },
    ],
} as const;