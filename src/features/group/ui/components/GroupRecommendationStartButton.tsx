import { groupDetailPanelStyles } from "@/ui/styles/groupDetailPanelStyles";

interface GroupRecommendationStartButtonProps {
    readonly label?: string;
    readonly onClick?: () => void;
}

export default function GroupRecommendationStartButton({
    label = "그룹 메뉴 추천 시작하기",
    onClick,
}: GroupRecommendationStartButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={groupDetailPanelStyles.recommendationButton}
        >
            {label}
        </button>
    );
}