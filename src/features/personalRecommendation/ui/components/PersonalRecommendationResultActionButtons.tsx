import { personalRecommendationResultActionButtonsStyles } from "@/ui/styles/personalRecommendationResultActionButtonsStyles";

interface PersonalRecommendationResultActionButtonsProps {
    readonly onRetryRecommendation: () => void;
    readonly onCompleteSelection: () => void;

    readonly isRetryRecommendationLoading?: boolean;
    readonly isCompleteSelectionLoading?: boolean;
}

export default function PersonalRecommendationResultActionButtons({
    onRetryRecommendation,
    onCompleteSelection,
    isRetryRecommendationLoading = false,
    isCompleteSelectionLoading = false,
}: PersonalRecommendationResultActionButtonsProps) {
    const isDisabled =
        isRetryRecommendationLoading || isCompleteSelectionLoading;

    return (
        <div className={personalRecommendationResultActionButtonsStyles.container}>
            <button
                type="button"
                onClick={onRetryRecommendation}
                disabled={isDisabled}
                className={
                    personalRecommendationResultActionButtonsStyles.retryRecommendationButton
                }
            >
                {isRetryRecommendationLoading ? "재요청 중..." : "재요청"}
            </button>

            <button
                type="button"
                onClick={onCompleteSelection}
                disabled={isDisabled}
                className={
                    personalRecommendationResultActionButtonsStyles.completeSelectionButton
                }
            >
                {isCompleteSelectionLoading ? "처리 중..." : "선택 완료"}
            </button>
        </div>
    );
}