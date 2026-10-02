"use client";

import { UsersRound } from "lucide-react";

import type { GroupInvitePreview } from "@/features/group/domain/model/GroupInvitePreview";

import { groupInvitePreviewStyles } from "@/ui/styles/groupInvitePreviewStyles";

interface GroupInvitePreviewViewProps {
    readonly preview: GroupInvitePreview;
    readonly isAuthenticated: boolean;
    readonly isJoining: boolean;
    readonly joinErrorMessage: string | null;
    readonly onCancel: () => void;
    readonly onLogin: () => void;
    readonly onJoin: () => void;
}

export default function GroupInvitePreviewView({
    preview,
    isAuthenticated,
    isJoining,
    joinErrorMessage,
    onCancel,
    onLogin,
    onJoin,
}: GroupInvitePreviewViewProps) {
    return (
        <main className={groupInvitePreviewStyles.page}>
            <section className={groupInvitePreviewStyles.content}>
                <div className={groupInvitePreviewStyles.inviteIcon}>
                    <UsersRound
                        size={34}
                        strokeWidth={1.8}
                        aria-hidden="true"
                    />
                </div>

                <div className={groupInvitePreviewStyles.groupInfo}>
                    <h1 className={groupInvitePreviewStyles.groupName}>
                        {preview.groupName}
                    </h1>

                    <div className={groupInvitePreviewStyles.ownerInfo}>
                        <span>
                            {preview.ownerNickname}님의 그룹
                        </span>
                    </div>

                    <div className={groupInvitePreviewStyles.memberInfo}>
                        <span>
                            그룹원 {preview.memberCount}명
                        </span>
                    </div>
                </div>

                <div className={groupInvitePreviewStyles.divider} />

                {isAuthenticated ? (
                    <section className={groupInvitePreviewStyles.actionSection}>
                        <div className={groupInvitePreviewStyles.actionTextArea}>
                            <h2 className={groupInvitePreviewStyles.actionTitle}>
                                이 그룹에 참여하시겠습니까?
                            </h2>

                            <p className={groupInvitePreviewStyles.actionDescription}>
                                그룹에 참여해 함께 메뉴를 골라보세요.
                            </p>
                        </div>

                        {joinErrorMessage && (
                            <p className={groupInvitePreviewStyles.joinErrorMessage}>
                                {joinErrorMessage}
                            </p>
                        )}

                        <div className={groupInvitePreviewStyles.buttonGroup}>
                            <button
                                type="button"
                                onClick={onCancel}
                                disabled={isJoining}
                                className={groupInvitePreviewStyles.secondaryButton}
                            >
                                아니요
                            </button>

                            <button
                                type="button"
                                onClick={onJoin}
                                disabled={isJoining}
                                className={groupInvitePreviewStyles.primaryButton}
                            >
                                {isJoining ? "참여 중..." : "참여할게요"}
                            </button>
                        </div>
                    </section>
                ) : (
                    <section className={groupInvitePreviewStyles.actionSection}>
                        <div className={groupInvitePreviewStyles.actionTextArea}>
                            <h2 className={groupInvitePreviewStyles.actionTitle}>
                                그룹에 가입하려면 로그인이 필요해요.
                            </h2>

                            <p className={groupInvitePreviewStyles.actionDescription}>
                                로그인한 후 그룹에 참여할 수 있어요.
                            </p>
                        </div>

                        <div className={groupInvitePreviewStyles.buttonGroup}>
                            <button
                                type="button"
                                onClick={onCancel}
                                className={groupInvitePreviewStyles.secondaryButton}
                            >
                                나가기
                            </button>

                            <button
                                type="button"
                                onClick={onLogin}
                                className={groupInvitePreviewStyles.primaryButton}
                            >
                                로그인 하기
                            </button>
                        </div>
                    </section>
                )}
            </section>
        </main>
    );
}