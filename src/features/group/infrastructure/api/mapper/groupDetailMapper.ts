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
            radiusMeters: response.radiusMeters,
            address: response.address ?? "",
        },

        members: response.members.map((member) => ({
            memberId: member.memberId,
            nickname: member.nickname,
            role: member.role,
            status: member.status,
            joinedAt: member.joinedAt,
            isMe: member.isMe,
        })),

        activeRecommendation: response.activeRecommendation
            ? {
                  sessionId: response.activeRecommendation.sessionId,
                  status: response.activeRecommendation.status,
                  readiness: response.activeRecommendation.readiness
                      ? {
                            totalMemberCount:
                                response.activeRecommendation.readiness
                                    .totalMemberCount,
                            readyMemberCount:
                                response.activeRecommendation.readiness
                                    .readyMemberCount,
                            allReady:
                                response.activeRecommendation.readiness
                                    .allReady,
                        }
                      : null,
              }
            : null,
    };
}