import { personalRecommendationResultActionButtonsStyles } from "@/ui/styles/personalRecommendationResultActionButtonsStyles";

interface PersonalRecommendationResultActionButtonsProps {
    readonly onRetryRecommendation: () => void;
    readonly onCompleteSelection: () => void;

    readonly canCompleteSelection: boolean;
    readonly isRetryRecommendationLoading?: boolean;
    readonly isCompleteSelectionLoading?: boolean;
    readonly isClosed?: boolean;
}

export default function PersonalRecommendationResultActionButtons({
    onRetryRecommendation,
    onCompleteSelection,
    canCompleteSelection,
    isRetryRecommendationLoading = false,
    isCompleteSelectionLoading = false,
    isClosed = false,
}: PersonalRecommendationResultActionButtonsProps) {
    const isActionLoading =
        isRetryRecommendationLoading || isCompleteSelectionLoading;

    return (
        <div className={personalRecommendationResultActionButtonsStyles.container}>
            <button
                type="button"
                onClick={onRetryRecommendation}
                disabled={isActionLoading || isClosed}
                className={
                    personalRecommendationResultActionButtonsStyles.retryRecommendationButton
                }
            >
                {isRetryRecommendationLoading ? "재요청 중..." : "재요청"}
            </button>

            <button
                type="button"
                onClick={onCompleteSelection}
                disabled={
                    isActionLoading || !canCompleteSelection || isClosed
                }
                className={
                    personalRecommendationResultActionButtonsStyles.completeSelectionButton
                }
            >
                {isClosed ? "선택 완료됨" : "선택 완료"}
            </button>
        </div>
    );
}