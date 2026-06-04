"use client";

import { ArrowLeft } from "lucide-react";

import { groupNameEditModalStyles } from "@/ui/styles/groupNameEditModalStyles";

interface GroupNameEditModalProps {
    readonly isOpen: boolean;
    readonly groupName: string;
    readonly isUpdating: boolean;
    readonly message: string | null;
    readonly onClose: () => void;
    readonly onChangeGroupName: (value: string) => void;
    readonly onSubmit: () => void;
}

export default function GroupNameEditModal({
    isOpen,
    groupName,
    isUpdating,
    message,
    onClose,
    onChangeGroupName,
    onSubmit,
}: GroupNameEditModalProps) {
    if (!isOpen) return null;

    const isDisabled = groupName.trim().length === 0 || isUpdating;

    return (
        <div className={groupNameEditModalStyles.overlay}>
            <div className={groupNameEditModalStyles.modal}>
                <button
                    type="button"
                    onClick={onClose}
                    className={groupNameEditModalStyles.backButton}
                >
                    <ArrowLeft size={22} />
                </button>

                <div className={groupNameEditModalStyles.content}>
                    <h2 className={groupNameEditModalStyles.title}>
                        그룹명 편집
                    </h2>

                    <input
                        type="text"
                        value={groupName}
                        onChange={(event) =>
                            onChangeGroupName(event.target.value)
                        }
                        placeholder="변경할 그룹명을 입력하세요."
                        className={groupNameEditModalStyles.input}
                    />

                    {message && (
                        <p className={groupNameEditModalStyles.message}>
                            {message}
                        </p>
                    )}

                    <div className={groupNameEditModalStyles.footer}>
                        <button
                            type="button"
                            disabled={isDisabled}
                            onClick={onSubmit}
                            className={
                                isDisabled
                                    ? groupNameEditModalStyles.disabledButton
                                    : groupNameEditModalStyles.submitButton
                            }
                        >
                            {isUpdating ? "수정 중..." : "수정"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}