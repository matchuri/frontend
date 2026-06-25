import { Check, Hourglass, User } from "lucide-react";

import { groupRecommendationPreparationPageStyles } from "@/ui/styles/groupRecommendationPreparationPageStyles";

interface GroupRecommendationPreparationMemberCardProps {
    readonly nickname: string;
    readonly isMe: boolean;
    readonly isReady: boolean;
    readonly hasPreference: boolean;
    readonly isCompletingPreparation?: boolean;
    readonly onClickEditPreference?: () => void;
    readonly onClickCompletePreparation?: () => void;
}

export default function GroupRecommendationPreparationMemberCard({
    nickname,
    isMe,
    isReady,
    hasPreference,
    isCompletingPreparation = false,
    onClickEditPreference,
    onClickCompletePreparation,
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
                            {hasPreference ? "취향 수정" : "취향 등록"}
                        </button>

                        <button
                            type="button"
                            onClick={onClickCompletePreparation}
                            disabled={isCompletingPreparation}
                            className={groupRecommendationPreparationPageStyles.readyButton}
                        >
                            {isCompletingPreparation
                                ? "처리 중"
                                : "준비 완료"}
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