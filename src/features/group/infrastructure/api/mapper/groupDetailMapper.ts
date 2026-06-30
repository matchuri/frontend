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
        recentlyRecommendation: response.recentlyRecommendation
            ? {
                  sessionId: response.recentlyRecommendation.sessionId,
                  status: response.recentlyRecommendation.status,
                  readiness: response.recentlyRecommendation.readiness
                      ? {
                            totalMemberCount:
                                response.recentlyRecommendation.readiness.totalMemberCount,
                            readyMemberCount:
                                response.recentlyRecommendation.readiness.readyMemberCount,
                            allReady:
                                response.recentlyRecommendation.readiness.allReady,
                        }
                      : null,
                  candidates: response.recentlyRecommendation.candidates.map(
                      (candidate) => ({
                          candidateId: candidate.candidateId,
                          menuId: candidate.menuId,
                          menuName: candidate.menuName,
                          thumbnailUrl: candidate.thumbnailUrl,
                          rankNo: candidate.rankNo,
                          score: candidate.score,
                          voteCount: candidate.voteCount,
                      }),
                  ),
                  voteProgress: response.recentlyRecommendation.voteProgress
                      ? {
                            totalMemberCount:
                                response.recentlyRecommendation.voteProgress.totalMemberCount,
                            votedMemberCount:
                                response.recentlyRecommendation.voteProgress.votedMemberCount,
                        }
                      : null,
                  finalCandidate: response.recentlyRecommendation.finalCandidate
                      ? {
                            candidateId:
                                response.recentlyRecommendation.finalCandidate.candidateId,
                            menuId:
                                response.recentlyRecommendation.finalCandidate.menuId,
                            menuName:
                                response.recentlyRecommendation.finalCandidate.menuName,
                            thumbnailUrl:
                                response.recentlyRecommendation.finalCandidate.thumbnailUrl,
                            rankNo:
                                response.recentlyRecommendation.finalCandidate.rankNo,
                            score:
                                response.recentlyRecommendation.finalCandidate.score,
                            voteCount:
                                response.recentlyRecommendation.finalCandidate.voteCount,
                        }
                      : null,
                  createdAt: response.recentlyRecommendation.createdAt,
              }
            : null,
    };
}