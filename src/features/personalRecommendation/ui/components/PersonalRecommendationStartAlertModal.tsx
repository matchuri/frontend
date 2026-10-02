import { CircleAlert } from "lucide-react";

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
            <div
                className={personalRecommendationStartAlertModalStyles.modal}
                role="dialog"
                aria-modal="true"
                aria-labelledby="personal-recommendation-start-alert-title"
            >
                <div className={personalRecommendationStartAlertModalStyles.icon}>
                    <CircleAlert
                        size={28}
                        strokeWidth={2}
                        aria-hidden="true"
                    />
                </div>

                <h2
                    id="personal-recommendation-start-alert-title"
                    className={personalRecommendationStartAlertModalStyles.title}
                >
                    메뉴 추천을 위해 위치 설정이 필요해요
                </h2>

                <p className={personalRecommendationStartAlertModalStyles.description}>
                    위치를 등록한 뒤 메뉴 추천을 시작할 수 있어요.
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