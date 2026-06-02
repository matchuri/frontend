"use client";

import { ArrowLeft } from "lucide-react";

import { groupInviteModalStyles } from "@/ui/styles/groupInviteModalStyles";

interface GroupInviteModalProps {
    readonly isOpen: boolean;
    readonly nickname: string;
    readonly onClose: () => void;
    readonly onChangeNickname: (value: string) => void;
}

export default function GroupInviteModal({
    isOpen,
    nickname,
    onClose,
    onChangeNickname,
}: GroupInviteModalProps) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className={groupInviteModalStyles.overlay}>
            <div className={groupInviteModalStyles.modal}>
                <button
                    type="button"
                    onClick={onClose}
                    className={groupInviteModalStyles.backButton}
                >
                    <ArrowLeft size={24} />
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

                    <div className={groupInviteModalStyles.footer}>
                        <button
                            type="button"
                            className={groupInviteModalStyles.inviteButton}
                        >
                            초대
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}