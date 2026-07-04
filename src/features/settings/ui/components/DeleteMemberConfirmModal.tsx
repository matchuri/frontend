"use client";

import { AlertTriangle } from "lucide-react";
import { settingsPageStyles } from "@/ui/styles/settingsPageStyles";

interface DeleteMemberConfirmModalProps {
    isOpen: boolean;
    isDeleting: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export default function DeleteMemberConfirmModal({
    isOpen,
    isDeleting,
    onClose,
    onConfirm,
}: DeleteMemberConfirmModalProps) {
    if (!isOpen) return null;

    return (
        <div className={settingsPageStyles.modalOverlay}>
            <div className={settingsPageStyles.modalBox}>
                <div className={settingsPageStyles.modalTitleWrapper}>
                    <AlertTriangle size={22} />
                    <h2 className={settingsPageStyles.modalTitle}>회원 탈퇴</h2>
                </div>

                <p className={settingsPageStyles.modalDescription}>
                    회원 탈퇴 후에는 해당 계정으로 다시 로그인할 수 없습니다.
                    <br />
                    회원 탈퇴를 진행하시겠습니까?
                </p>

                <div className={settingsPageStyles.modalButtonWrapper}>
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isDeleting}
                        className={settingsPageStyles.modalCancelButton}
                    >
                        취소
                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={isDeleting}
                        className={settingsPageStyles.modalDangerButton}
                    >
                        {isDeleting ? "탈퇴 중..." : "탈퇴하기"}
                    </button>
                </div>
            </div>
        </div>
    );
}