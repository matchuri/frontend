"use client";

import { ArrowLeft } from "lucide-react";

import { groupInviteModalStyles } from "@/ui/styles/groupInviteModalStyles";

interface GroupInviteModalProps {
    readonly isOpen: boolean;
    readonly nickname: string;
    readonly isInviting: boolean;
    readonly message: string | null;
    readonly onClose: () => void;
    readonly onChangeNickname: (value: string) => void;
    readonly onInvite: () => void;
}

export default function GroupInviteModal({
    isOpen,
    nickname,
    isInviting,
    message,
    onClose,
    onChangeNickname,
    onInvite,
}: GroupInviteModalProps) {
    if (!isOpen) {
        return null;
    }

    const isDisabled =
        nickname.trim().length === 0 || isInviting;

    return (
        <div className={groupInviteModalStyles.overlay}>
            <div className={groupInviteModalStyles.modal}>
                <button
                    type="button"
                    onClick={onClose}
                    className={groupInviteModalStyles.backButton}
                >
                    <ArrowLeft size={22} />
                </button>

                <div className={groupInviteModalStyles.content}>
                    <h2 className={groupInviteModalStyles.title}>
                        친구 초대
                    </h2>

                    <input
                        type="text"
                        value={nickname}
                        onChange={(event) =>
                            onChangeNickname(event.target.value)
                        }
                        placeholder="초대할 친구의 닉네임을 입력하세요."
                        className={groupInviteModalStyles.input}
                    />

                    {message && (
                        <p className={groupInviteModalStyles.message}>
                            {message}
                        </p>
                    )}

                    <div className={groupInviteModalStyles.footer}>
                        <button
                            type="button"
                            disabled={isDisabled}
                            onClick={onInvite}
                            className={
                                isDisabled
                                    ? groupInviteModalStyles.disabledButton
                                    : groupInviteModalStyles.inviteButton
                            }
                        >
                            {isInviting ? "초대 중..." : "초대"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}