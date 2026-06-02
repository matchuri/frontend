import { groupDetailPanelStyles } from "@/ui/styles/groupDetailPanelStyles";

interface GroupRecommendationStartButtonProps {
    readonly onClick?: () => void;
}

export default function GroupRecommendationStartButton({
    onClick,
}: GroupRecommendationStartButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={groupDetailPanelStyles.recommendationButton}
        >
            그룹 메뉴 추천 시작하기
        </button>
    );
}