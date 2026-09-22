"use client";

import { UserPlus, X } from "lucide-react";

import { groupInviteModalStyles } from "@/ui/styles/groupInviteModalStyles";

interface GroupInviteModalProps {
    readonly isOpen: boolean;
    readonly nickname: string;
    readonly isInviting: boolean;
    readonly message: string | null;
    readonly onClose: () => void;
    readonly onChangeNickname: (value: string) => void;
    readonly onClearMessage: () => void;
    readonly onInvite: () => void;
}

export default function GroupInviteModal({
    isOpen,
    nickname,
    isInviting,
    message,
    onClose,
    onChangeNickname,
    onClearMessage,
    onInvite,
}: GroupInviteModalProps) {
    if (!isOpen) {
        return null;
    }

    const isDisabled =
        nickname.trim().length === 0 || isInviting;

    return (
        <div className={groupInviteModalStyles.overlay}>
            <section
                className={groupInviteModalStyles.modal}
                role="dialog"
                aria-modal="true"
                aria-labelledby="group-invite-modal-title"
            >
                <header className={groupInviteModalStyles.header}>
                    <div>
                        <h2
                            id="group-invite-modal-title"
                            className={groupInviteModalStyles.title}
                        >
                            친구 초대
                        </h2>

                        <p className={groupInviteModalStyles.description}>
                            초대할 친구의 닉네임을 입력하세요.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isInviting}
                        className={groupInviteModalStyles.closeButton}
                        aria-label="친구 초대 닫기"
                    >
                        <X
                            size={26}
                            strokeWidth={2}
                            aria-hidden="true"
                        />
                    </button>
                </header>

                <div className={groupInviteModalStyles.content}>
                    <div className={groupInviteModalStyles.inputSection}>
                        <label
                            htmlFor="group-invite-nickname"
                            className={groupInviteModalStyles.label}
                        >
                            친구 닉네임
                        </label>

                        <div className={groupInviteModalStyles.inputWrapper}>
                            <UserPlus
                                size={19}
                                className={groupInviteModalStyles.inputIcon}
                                aria-hidden="true"
                            />

                            <input
                                id="group-invite-nickname"
                                type="text"
                                value={nickname}
                                disabled={isInviting}
                                onChange={(event) =>
                                    onChangeNickname(event.target.value)
                                }
                                onFocus={onClearMessage}
                                onKeyDown={(event) => {
                                    if (event.key === "Enter" && !isDisabled) {
                                        onInvite();
                                    }
                                }}
                                placeholder="닉네임을 입력해주세요."
                                className={groupInviteModalStyles.input}
                                autoFocus
                            />
                        </div>

                        {message && (
                            <p className={groupInviteModalStyles.message}>
                                {message}
                            </p>
                        )}
                    </div>
                </div>

                <footer className={groupInviteModalStyles.footer}>
                    <button
                        type="button"
                        disabled={isDisabled}
                        onClick={onInvite}
                        className={groupInviteModalStyles.inviteButton}
                    >
                        {isInviting ? "초대 중..." : "초대하기"}
                    </button>
                </footer>
            </section>
        </div>
    );
}