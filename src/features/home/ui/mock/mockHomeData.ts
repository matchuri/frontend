export const mockHomeData = {
    user: {
        nickname: "점심탐험가",
        profileImageUrl: null,
    },

    location: {
        address: "서울 서초구 서초동",
    },

    tasteProfile: {
        attributes: [
            "매콤",
            "한식",
            "국물/탕",
            "면 요리",
        ],
    },

    personalRecommendationHistory: [
        {
            id: 9001,
            menuName: "김치찌개",
            recommendedDate: "2026.09.03",
            categories: ["한식"],
        },
        {
            id: 9000,
            menuName: "마라탕",
            recommendedDate: "2026.09.01",
            categories: ["중식"],
        },
        {
            id: 8999,
            menuName: "돈까스",
            recommendedDate: "2026.08.30",
            categories: ["일식"],
        },
//         {
//             id: 8998,
//             menuName: "제육볶음",
//             recommendedDate: "2026.08.28",
//             categories: ["한식"],
//         },
    ],

    recentGroupActivities: [
        {
            groupId: 3001,
            groupName: "디자인팀 점심팟",
            type: "PREPARING",
            details: {
                recommendationId: 5007,
                createdAt: "2026-09-04T02:50:00",
                startedAt: null,
                endedAt: null,
                selectedMenuName: null,
            },
        },
        {
            groupId: 3002,
            groupName: "배고파요",
            type: "OPEN",
            details: {
                recommendationId: 5006,
                createdAt: "2026-09-04T02:00:00",
                startedAt: "2026-09-04T02:20:00",
                endedAt: null,
                selectedMenuName: null,
            },
        },
        {
            groupId: 3003,
            groupName: "금요일 저녁 모임",
            type: "FINALIZED",
            details: {
                recommendationId: 5005,
                createdAt: "2026-09-04T00:30:00",
                startedAt: "2026-09-04T00:40:00",
                endedAt: "2026-09-04T01:10:00",
                selectedMenuName: "마라탕",
            },
        },
        {
            groupId: 3004,
            groupName: "프론트엔드 점심팟",
            type: "PREPARING",
            details: {
                recommendationId: 5004,
                createdAt: "2026-09-03T23:30:00",
                startedAt: null,
                endedAt: null,
                selectedMenuName: null,
            },
        },
        {
            groupId: 3005,
            groupName: "주말 맛집 탐험대",
            type: "OPEN",
            details: {
                recommendationId: 5003,
                createdAt: "2026-09-03T22:00:00",
                startedAt: "2026-09-03T22:20:00",
                endedAt: null,
                selectedMenuName: null,
            },
        },
        {
            groupId: 3006,
            groupName: "퇴근 후 저녁 모임",
            type: "FINALIZED",
            details: {
                recommendationId: 5002,
                createdAt: "2026-09-03T20:00:00",
                startedAt: "2026-09-03T20:10:00",
                endedAt: "2026-09-03T20:40:00",
                selectedMenuName: "삼겹살",
            },
        },
        {
            groupId: 3007,
            groupName: "월요일 점심 모임",
            type: "FINALIZED",
            details: {
                recommendationId: 5001,
                createdAt: "2026-09-02T11:30:00",
                startedAt: "2026-09-02T11:40:00",
                endedAt: "2026-09-02T12:10:00",
                selectedMenuName: "김치찌개",
            },
        },
    ],
} as const;