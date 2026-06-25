import { Check, User } from "lucide-react";

import { groupRecommendationResultPageStyles } from "@/ui/styles/groupRecommendationResultPageStyles";

interface GroupRecommendationResultMember {
    readonly memberId: number;
    readonly nickname: string;
    readonly isMe: boolean;
    readonly voted: boolean;
}

interface GroupRecommendationResultMemberListProps {
    readonly members: readonly GroupRecommendationResultMember[];
}

export default function GroupRecommendationResultMemberList({
    members,
}: GroupRecommendationResultMemberListProps) {
    // 멤버가 6명 이상이면 가로 스크롤 영역으로 렌더링
    const isScrollable = members.length >= 5;

    return (
        <section className={groupRecommendationResultPageStyles.memberStatusCard}>
            <h2 className={groupRecommendationResultPageStyles.memberStatusTitle}>
                멤버 목록
            </h2>

            <div
                // 5명 이하는 가운데 정렬, 6명 이상은 가로 스크롤
                className={
                    isScrollable
                        ? groupRecommendationResultPageStyles.memberListScrollable
                        : groupRecommendationResultPageStyles.memberList
                }
            >
                {members.map((member) => (
                    <div
                        key={member.memberId}
                        className={groupRecommendationResultPageStyles.memberItem}
                    >
                        <div className={groupRecommendationResultPageStyles.memberAvatarWrapper}>
                            <div className={groupRecommendationResultPageStyles.memberAvatar}>
                                <User size={36} />
                            </div>

                            {member.voted && (
                                <span className={groupRecommendationResultPageStyles.memberCheckIcon}>
                                    <Check size={14} />
                                </span>
                            )}
                        </div>

                        <strong className={groupRecommendationResultPageStyles.memberNickname}>
                            {member.nickname}
                            {member.isMe && " (나)"}
                        </strong>

                        <span
                            className={
                                member.voted
                                    ? groupRecommendationResultPageStyles.memberStatusReady
                                    : groupRecommendationResultPageStyles.memberStatusWaiting
                            }
                        >
                            {member.voted ? "투표 완료" : "투표 중"}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
}