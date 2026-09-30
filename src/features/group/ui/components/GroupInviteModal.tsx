"use client";

import { useState } from "react";
import {
    Check,
    Copy,
    Link2,
    UserPlus,
    X,
} from "lucide-react";

import { groupInviteModalStyles } from "@/ui/styles/groupInviteModalStyles";

interface GroupInviteModalProps {
    readonly isOpen: boolean;
    readonly nickname: string;
    readonly isInviting: boolean;
    readonly message: string | null;
    readonly inviteLink?: string | null;
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
    inviteLink = null,
    onClose,
    onChangeNickname,
    onClearMessage,
    onInvite,
}: GroupInviteModalProps) {
    const [copyMessage, setCopyMessage] = useState<string | null>(null);

    if (!isOpen) {
        return null;
    }

    const isDisabled =
        nickname.trim().length === 0 || isInviting;

    const handleClose = () => {
        setCopyMessage(null);
        onClose();
    };

    const handleCopyInviteLink = async () => {
        if (!inviteLink) {
            return;
        }

        try {
            await navigator.clipboard.writeText(inviteLink);
            setCopyMessage("초대 링크를 복사했어요.");
        } catch {
            setCopyMessage("초대 링크를 복사하지 못했어요.");
        }
    };

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
                            닉네임으로 초대하거나 링크를 공유해보세요.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleClose}
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
                            닉네임으로 초대
                        </label>

                        <div className={groupInviteModalStyles.nicknameInviteRow}>
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
                                    onChange={(event) => onChangeNickname(event.target.value)}
                                    onFocus={onClearMessage}
                                    onKeyDown={(event) => {
                                        if (event.key === "Enter" &&
                                            !isDisabled
                                        ) {
                                            onInvite();
                                        }
                                    }}
                                    placeholder="닉네임을 입력해주세요."
                                    className={groupInviteModalStyles.input}
                                    autoFocus
                                />
                            </div>

                            <button
                                type="button"
                                disabled={isDisabled}
                                onClick={onInvite}
                                className={groupInviteModalStyles.inviteButton}
                            >
                                {isInviting ? "초대 중..." : "초대하기"}
                            </button>
                        </div>

                        {message && (
                            <p className={groupInviteModalStyles.message}>
                                {message}
                            </p>
                        )}
                    </div>

                    <div className={groupInviteModalStyles.linkSection}>
                        <div className={groupInviteModalStyles.linkHeader}>
                            <div className={groupInviteModalStyles.linkIcon}>
                                <Link2
                                    size={18}
                                    strokeWidth={2}
                                    aria-hidden="true"
                                />
                            </div>

                            <div>
                                <p className={groupInviteModalStyles.label}>
                                    초대 링크 공유
                                </p>

                                <p className={groupInviteModalStyles.linkDescription}>
                                    링크를 공유해 친구를 그룹에 초대할 수 있어요.
                                </p>
                            </div>
                        </div>

                        {inviteLink ? (
                            <>
                                <div className={groupInviteModalStyles.linkWrapper}>
                                    <p className={groupInviteModalStyles.linkText}>
                                        {inviteLink}
                                    </p>

                                    <button
                                        type="button"
                                        onClick={() => void handleCopyInviteLink()}
                                        className={groupInviteModalStyles.copyButton}
                                    >
                                        <Copy
                                            size={16}
                                            strokeWidth={2}
                                            aria-hidden="true"
                                        />
                                        복사하기
                                    </button>
                                </div>

                                {copyMessage && (
                                    <p
                                        className={
                                            copyMessage ===
                                            "초대 링크를 복사했어요."
                                                ? groupInviteModalStyles.copySuccessMessage
                                                : groupInviteModalStyles.copyErrorMessage
                                        }
                                    >
                                        {copyMessage ===
                                            "초대 링크를 복사했어요." && (
                                            <Check
                                                size={14}
                                                strokeWidth={2.5}
                                                aria-hidden="true"
                                            />
                                        )}
                                        {copyMessage}
                                    </p>
                                )}
                            </>
                        ) : (
                            <div className={groupInviteModalStyles.emptyLink}>
                                <p className={groupInviteModalStyles.emptyLinkTitle}>
                                    아직 생성된 초대 링크가 없어요.
                                </p>

                                <p className={groupInviteModalStyles.emptyLinkDescription}>
                                    초대 링크가 생성되면 이곳에서 복사할 수 있어요.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}