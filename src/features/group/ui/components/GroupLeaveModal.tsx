"use client";

import { LogOut } from "lucide-react";

import { groupLeaveModalStyles } from "@/ui/styles/groupLeaveModalStyles";

interface GroupLeaveModalProps {
    readonly isOpen: boolean;
    readonly isLeaving: boolean;
    readonly onClose: () => void;
    readonly onLeave: () => void;
}

export default function GroupLeaveModal({
    isOpen,
    isLeaving,
    onClose,
    onLeave,
}: GroupLeaveModalProps) {
    if (!isOpen) return null;

    return (
        <div className={groupLeaveModalStyles.overlay}>
            <section
                className={groupLeaveModalStyles.modal}
                role="dialog"
                aria-modal="true"
                aria-labelledby="group-leave-modal-title"
            >
                <div className={groupLeaveModalStyles.icon}>
                    <LogOut size={26} aria-hidden="true" />
                </div>

                <h2
                    id="group-leave-modal-title"
                    className={groupLeaveModalStyles.title}
                >
                    그룹에서 나가시겠습니까?
                </h2>

                <p className={groupLeaveModalStyles.description}>
                    그룹에서 나가면 더 이상 해당 그룹 정보를 확인할 수 없습니다.
                </p>

                <div className={groupLeaveModalStyles.actions}>
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isLeaving}
                        className={groupLeaveModalStyles.cancelButton}
                    >
                        취소
                    </button>

                    <button
                        type="button"
                        disabled={isLeaving}
                        onClick={onLeave}
                        className={groupLeaveModalStyles.leaveButton}
                    >
                        {isLeaving ? "나가는 중..." : "나가기"}
                    </button>
                </div>
            </section>
        </div>
    );
}