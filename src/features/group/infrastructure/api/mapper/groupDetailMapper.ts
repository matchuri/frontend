import type { GroupDetail } from "@/features/group/domain/model/GroupDetail";
import type { GroupDetailResponse } from "@/features/group/infrastructure/api/dto/GroupDetailResponse";

export function mapGroupDetail(
    response: GroupDetailResponse["data"],
): GroupDetail {
    return {
        id: response.id,
        name: response.name,
        inviteCode: response.inviteCode,
        location: {
            latitude: response.latitude,
            longitude: response.longitude,

            level: response.level,
            address: response.address,
        },

        members: response.members.map((member) => ({
            memberId: member.memberId,
            nickname: member.nickname,
            role: member.role,
            status: member.status,
            joinedAt: member.joinedAt,
            isMe: member.isMe ?? false, // TODO: 나중에 수정 필요
        })),

        activeRecommendation: response.activeRecommendation
            ? {
                  sessionId: response.activeRecommendation.sessionId,
                  status: response.activeRecommendation.status,
                  totalMemberCount:
                      response.activeRecommendation.readiness.totalMemberCount,
                  readyMemberCount:
                      response.activeRecommendation.readiness.readyMemberCount,
                  allReady:
                      response.activeRecommendation.readiness.allReady,
              }
            : null,
    };
}