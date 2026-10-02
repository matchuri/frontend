import Image from "next/image";
import { Check, Clock3, UserRound } from "lucide-react";

import { groupRecommendationPreparationPageStyles } from "@/ui/styles/groupRecommendationPreparationPageStyles";

interface GroupRecommendationPreparationMemberCardProps {
    readonly nickname: string;
    readonly profileImageUrl?: string | null;
    readonly isMe: boolean;
    readonly isReady: boolean;
}

export default function GroupRecommendationPreparationMemberCard({
    nickname,
    profileImageUrl,
    isMe,
    isReady,
}: GroupRecommendationPreparationMemberCardProps) {
    return (
        <article className={groupRecommendationPreparationPageStyles.memberCard}>
            <div className={groupRecommendationPreparationPageStyles.memberInfo}>
                <div className={groupRecommendationPreparationPageStyles.memberAvatar}>
                    {profileImageUrl ? (
                        <Image
                            src={profileImageUrl}
                            alt={`${nickname} 프로필`}
                            fill
                            sizes="48px"
                            className={groupRecommendationPreparationPageStyles.memberAvatarImage}
                        />
                    ) : (
                        <UserRound size={24} strokeWidth={1.8} aria-hidden="true" />
                    )}
                </div>

                <div className={groupRecommendationPreparationPageStyles.memberNameRow}>
                    {isMe && (
                        <span className={groupRecommendationPreparationPageStyles.myLabel}>
                            나
                        </span>
                    )}
                    <strong
                        className={groupRecommendationPreparationPageStyles.memberName}
                        title={nickname}
                    >
                        {nickname}
                    </strong>
                </div>
            </div>

            {isReady ? (
                <span className={groupRecommendationPreparationPageStyles.readyBadge}>
                    <Check size={14} aria-hidden="true" />
                    준비 완료
                </span>
            ) : (
                <span className={groupRecommendationPreparationPageStyles.waitingBadge}>
                    <Clock3 size={14} aria-hidden="true" />
                    준비 대기
                </span>
            )}
        </article>
    );
}