import { groupRecommendationPreparationPageStyles } from "@/ui/styles/groupRecommendationPreparationPageStyles";

interface GroupRecommendationPreparationActionsProps {
    readonly isReady: boolean;
    readonly isCompletingPreparation: boolean;
    readonly onClickEditPreference: () => void;
    readonly onClickCompletePreparation: () => void;
}

export default function GroupRecommendationPreparationActions({
    isReady,
    isCompletingPreparation,
    onClickEditPreference,
    onClickCompletePreparation,
}: GroupRecommendationPreparationActionsProps) {
    return (
        <div className={groupRecommendationPreparationPageStyles.bottomActions}>
            <button
                type="button"
                onClick={onClickEditPreference}
                disabled={isReady || isCompletingPreparation}
                className={groupRecommendationPreparationPageStyles.preferenceEditButton}
            >
                취향 수정하기
            </button>

            <button
                type="button"
                onClick={onClickCompletePreparation}
                disabled={isReady || isCompletingPreparation}
                className={groupRecommendationPreparationPageStyles.readyButton}
            >
                {isCompletingPreparation
                    ? "처리 중..."
                    : isReady
                        ? "준비 완료됨"
                        : "준비 완료"}
            </button>
        </div>
    );
}