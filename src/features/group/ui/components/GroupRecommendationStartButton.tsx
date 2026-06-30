import { groupDetailPanelStyles } from "@/ui/styles/groupDetailPanelStyles";

interface GroupRecommendationStartButtonProps {
    readonly label?: string;
    readonly variant?: "default" | "preparing" | "open";
    readonly onClick: () => void;
}

export default function GroupRecommendationStartButton({
    label = "그룹 메뉴 추천 시작하기",
    variant = "default",
    onClick,
}: GroupRecommendationStartButtonProps) {
    const className =
        variant === "preparing"
            ? groupDetailPanelStyles.preparingRecommendationButton
            : variant === "open"
              ? groupDetailPanelStyles.openRecommendationButton
              : groupDetailPanelStyles.recommendationButton;

    return (
        <button
            type="button"
            onClick={onClick}
            className={className}
        >
            {label}
        </button>
    );
}