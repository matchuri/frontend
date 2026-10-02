import { CircleAlert } from "lucide-react";

import { signupExitConfirmModalStyles } from "@/ui/styles/signupExitConfirmModalStyles";

interface SignupExitConfirmModalProps {
    readonly isOpen: boolean;
    readonly isExiting: boolean;
    readonly onClose: () => void;
    readonly onConfirm: () => void;
}

export default function SignupExitConfirmModal({
    isOpen,
    isExiting,
    onClose,
    onConfirm,
}: SignupExitConfirmModalProps) {
    if (!isOpen) return null;

    return (
        <div className={signupExitConfirmModalStyles.overlay}>
            <div
                className={signupExitConfirmModalStyles.modal}
                role="dialog"
                aria-modal="true"
                aria-labelledby="signup-exit-confirm-title"
            >
                <div className={signupExitConfirmModalStyles.icon}>
                    <CircleAlert
                        size={28}
                        strokeWidth={2}
                        aria-hidden="true"
                    />
                </div>

                <h2
                    id="signup-exit-confirm-title"
                    className={signupExitConfirmModalStyles.title}
                >
                    회원가입을 중단하시겠습니까?
                </h2>

                <p className={signupExitConfirmModalStyles.description}>
                    지금까지 입력한 회원가입 정보는 저장되지 않습니다.
                </p>

                <div className={signupExitConfirmModalStyles.buttonGroup}>
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isExiting}
                        className={signupExitConfirmModalStyles.cancelButton}
                    >
                        취소
                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={isExiting}
                        className={signupExitConfirmModalStyles.confirmButton}
                    >
                        {isExiting ? "처리 중..." : "확인"}
                    </button>
                </div>
            </div>
        </div>
    );
}