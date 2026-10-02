import Image from "next/image";
import { Check, UserRound } from "lucide-react";

import { groupRecommendationResultPageStyles } from "@/ui/styles/groupRecommendationResultPageStyles";

interface GroupRecommendationResultMember {
    readonly memberId: number;
    readonly nickname: string;
    readonly profileImageUrl: string | null;
    readonly isMe: boolean;
    readonly voted: boolean;
}

interface GroupRecommendationResultMemberListProps {
    readonly members: readonly GroupRecommendationResultMember[];
}

export default function GroupRecommendationResultMemberList({
    members,
}: GroupRecommendationResultMemberListProps) {
    return (
        <section className={groupRecommendationResultPageStyles.memberSection}>
            <div className={groupRecommendationResultPageStyles.memberSectionHeader}>
                <h2 className={groupRecommendationResultPageStyles.memberStatusTitle}>
                    그룹원
                </h2>
                <span className={groupRecommendationResultPageStyles.memberSectionCount}>
                    총 {members.length}명
                </span>
            </div>

            <div
                className={groupRecommendationResultPageStyles.memberList}
                role="region"
                aria-label="그룹원 목록, 가로 스크롤 가능"
                tabIndex={0}
            >
                {members.map((member) => (
                    <article
                        key={member.memberId}
                        className={groupRecommendationResultPageStyles.memberItem}
                    >
                        <div className={groupRecommendationResultPageStyles.memberAvatarWrapper}>
                            <div className={groupRecommendationResultPageStyles.memberAvatar}>
                                {member.profileImageUrl ? (
                                    <Image
                                        src={member.profileImageUrl}
                                        alt={`${member.nickname} 프로필`}
                                        fill
                                        sizes="80px"
                                        className={groupRecommendationResultPageStyles.memberAvatarImage}
                                    />
                                ) : (
                                    <UserRound size={32} strokeWidth={1.8} aria-hidden="true" />
                                )}
                            </div>

                            {member.voted && (
                                <span
                                    className={groupRecommendationResultPageStyles.memberVoteCheck}
                                    aria-label="투표 완료"
                                >
                                    <Check size={14} strokeWidth={2.5} aria-hidden="true" />
                                </span>
                            )}
                        </div>

                        <div className={groupRecommendationResultPageStyles.memberInfo}>
                            <div className={groupRecommendationResultPageStyles.memberNameRow}>
                                <strong
                                    className={groupRecommendationResultPageStyles.memberNickname}
                                    title={member.nickname}
                                >
                                    {member.nickname}
                                </strong>
                                {member.isMe && (
                                    <span className={groupRecommendationResultPageStyles.myLabel}>
                                        (나)
                                    </span>
                                )}
                            </div>

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
                    </article>
                ))}
            </div>
        </section>
    );
}