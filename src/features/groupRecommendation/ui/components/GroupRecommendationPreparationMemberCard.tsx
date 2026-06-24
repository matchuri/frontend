import { Check, Hourglass, User } from "lucide-react";

import { groupRecommendationPreparationPageStyles } from "@/ui/styles/groupRecommendationPreparationPageStyles";

interface GroupRecommendationPreparationMemberCardProps {
    readonly nickname: string;
    readonly isMe: boolean;
    readonly isReady: boolean;
    readonly onClickEditPreference?: () => void;
    readonly onClickReady?: () => void;
}

export default function GroupRecommendationPreparationMemberCard({
    nickname,
    isMe,
    isReady,
    onClickEditPreference,
    onClickReady,
}: GroupRecommendationPreparationMemberCardProps) {
    return (
        <article
            className={
                isMe
                    ? groupRecommendationPreparationPageStyles.myMemberCard
                    : groupRecommendationPreparationPageStyles.memberCard
            }
        >
            <div className={groupRecommendationPreparationPageStyles.memberInfo}>
                <div className={groupRecommendationPreparationPageStyles.memberAvatar}>
                    <User size={42} />
                </div>

                <strong className={groupRecommendationPreparationPageStyles.memberName}>
                    {nickname}
                    {isMe && " (나)"}
                </strong>
            </div>

            <div className={groupRecommendationPreparationPageStyles.memberActionArea}>
                {isMe && !isReady && (
                    <>
                        <button
                            type="button"
                            onClick={onClickEditPreference}
                            className={groupRecommendationPreparationPageStyles.preferenceEditButton}
                        >
                            취향 수정
                        </button>

                        <button
                            type="button"
                            onClick={onClickReady}
                            className={groupRecommendationPreparationPageStyles.readyButton}
                        >
                            준비 완료
                        </button>
                    </>
                )}

                {isReady && (
                    <span className={groupRecommendationPreparationPageStyles.readyIcon}>
                        <Check size={18} />
                    </span>
                )}

                {!isMe && !isReady && (
                    <span className={groupRecommendationPreparationPageStyles.waitingIcon}>
                        <Hourglass size={18} />
                    </span>
                )}
            </div>
        </article>
    );
}