"use client";

import { groupDeleteModalStyles } from "@/ui/styles/groupDeleteModalStyles";

interface GroupDeleteModalProps {
    readonly isOpen: boolean;
    readonly isDeleting: boolean;

    readonly onClose: () => void;
    readonly onDelete: () => void;
}

export default function GroupDeleteModal({
    isOpen,
    isDeleting,
    onClose,
    onDelete,
}: GroupDeleteModalProps) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className={groupDeleteModalStyles.overlay}>
            <div className={groupDeleteModalStyles.modal}>
                <h2 className={groupDeleteModalStyles.title}>
                    그룹을 삭제하시겠습니까?
                </h2>

                <p className={groupDeleteModalStyles.description}>
                    삭제된 그룹은 다시 복구할 수 없습니다.
                </p>

                <div className={groupDeleteModalStyles.actions}>
                    <button
                        type="button"
                        onClick={onClose}
                        className={groupDeleteModalStyles.cancelButton}
                    >
                        취소
                    </button>

                    <button
                        type="button"
                        disabled={isDeleting}
                        onClick={onDelete}
                        className={groupDeleteModalStyles.deleteButton}
                    >
                        {isDeleting
                            ? "삭제 중..."
                            : "삭제"}
                    </button>
                </div>
            </div>
        </div>
    );
}