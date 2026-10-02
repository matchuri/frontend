import type { GroupInvite } from "@/features/group/domain/model/GroupInvite";

export const mockGroupInvites: readonly GroupInvite[] = [
    {
        inviteId: 1001,
        groupId: 3001,
        groupName: "디자인팀 점심팟",
        requestMemberId: 10,
        requestMemberNickname: "김맛집",
        status: "PENDING",
        expiresAt: "2026-09-07T12:00:00",
        createdAt: "2026-09-04T10:00:00",
    },
    {
        inviteId: 1002,
        groupId: 3002,
        groupName: "프론트엔드 맛집 탐험대",
        requestMemberId: 11,
        requestMemberNickname: "이점심",
        status: "PENDING",
        expiresAt: "2026-09-07T13:00:00",
        createdAt: "2026-09-04T11:00:00",
    },
    {
        inviteId: 1003,
        groupId: 3003,
        groupName: "금요일 저녁 모임",
        requestMemberId: 12,
        requestMemberNickname: "박메뉴",
        status: "PENDING",
        expiresAt: "2026-09-07T14:00:00",
        createdAt: "2026-09-04T12:00:00",
    },
    {
        inviteId: 1004,
        groupId: 3004,
        groupName: "주말 맛집 탐방",
        requestMemberId: 13,
        requestMemberNickname: "최먹방",
        status: "PENDING",
        expiresAt: "2026-09-07T15:00:00",
        createdAt: "2026-09-04T13:00:00",
    },
];