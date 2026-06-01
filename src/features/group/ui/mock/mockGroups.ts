import type { Group } from "@/features/group/domain/model/Group";

export const mockGroups: readonly Group[] = [
    {
        id: 1,
        name: "맛집 탐방 모임",
        memberCount: 4,
        createdAt: "2026.03.14",
        recommendationStatus: null,
        isOwner: true,
    },
    {
        id: 2,
        name: "점심 회식",
        memberCount: 10,
        createdAt: "2026.03.12",
        recommendationStatus: "OPEN",
        isOwner: false,
    },
    {
        id: 3,
        name: "가족 외식",
        memberCount: 6,
        createdAt: "2026.03.11",
        recommendationStatus: "CLOSED",
        isOwner: false,
    },
];