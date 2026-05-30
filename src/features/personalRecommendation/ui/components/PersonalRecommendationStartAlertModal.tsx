import { personalRecommendationStartAlertModalStyles } from "@/ui/styles/personalRecommendationStartAlertModalStyles";

interface PersonalRecommendationStartAlertModalProps {
    readonly isOpen: boolean;
    readonly onClose: () => void;
}

export default function PersonalRecommendationStartAlertModal({
    isOpen,
    onClose,
}: PersonalRecommendationStartAlertModalProps) {
    if (!isOpen) return null;

    return (
        <div className={personalRecommendationStartAlertModalStyles.overlay}>
            <div className={personalRecommendationStartAlertModalStyles.modal}>
                <h2 className={personalRecommendationStartAlertModalStyles.title}>
                    메뉴 추천을 위해 취향과 위치 설정이 필요해요
                </h2>

                <p className={personalRecommendationStartAlertModalStyles.description}>
                    취향과 위치를 모두 등록한 뒤 메뉴 추천을 시작할 수 있어요.
                </p>

                <button
                    type="button"
                    onClick={onClose}
                    className={personalRecommendationStartAlertModalStyles.confirmButton}
                >
                    확인
                </button>
            </div>
        </div>
    );
}