"use client";

import { Crown, UserRound, X } from "lucide-react";

import type { GroupDetailMember } from "@/features/group/domain/model/GroupDetailMember";

import { groupMemberListModalStyles } from "@/ui/styles/groupMemberListModalStyles";

interface GroupMemberListModalProps {
    readonly isOpen: boolean;
    readonly members: readonly GroupDetailMember[];
    readonly onClose: () => void;
}

export default function GroupMemberListModal({
    isOpen,
    members,
    onClose,
}: GroupMemberListModalProps) {
    if (!isOpen) {
        return null;
    }

    const sortedMembers = [...members].sort((a, b) => {
        if (a.role === "OWNER" && b.role !== "OWNER") {
            return -1;
        }

        if (a.role !== "OWNER" && b.role === "OWNER") {
            return 1;
        }

        if (a.isMe && !b.isMe) {
            return -1;
        }

        if (!a.isMe && b.isMe) {
            return 1;
        }

        return 0;
    });

    return (
        <div
            className={groupMemberListModalStyles.overlay}
            onClick={onClose}
        >
            <div
                className={groupMemberListModalStyles.modal}
                onClick={(event) => event.stopPropagation()}
            >
                <header className={groupMemberListModalStyles.header}>
                    <div>
                        <h2 className={groupMemberListModalStyles.title}>
                            참여 그룹원
                        </h2>

                        <p className={groupMemberListModalStyles.memberCount}>
                            총 {members.length}명
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className={groupMemberListModalStyles.closeButton}
                        aria-label="참여 그룹원 목록 닫기"
                    >
                        <X
                            size={20}
                            aria-hidden="true"
                        />
                    </button>
                </header>

                <div className={groupMemberListModalStyles.memberList}>
                    {sortedMembers.map((member) => (
                        <div
                            key={member.memberId}
                            className={groupMemberListModalStyles.memberItem}
                        >
                            <div className={groupMemberListModalStyles.memberAvatar}>
                                <UserRound
                                    size={22}
                                    strokeWidth={1.8}
                                    aria-hidden="true"
                                />
                            </div>

                            <div className={groupMemberListModalStyles.memberInfo}>
                                <span className={groupMemberListModalStyles.nickname}>
                                    {member.nickname}

                                    {member.isMe && (
                                        <span className={groupMemberListModalStyles.meText}>
                                            나
                                        </span>
                                    )}
                                </span>
                            </div>

                            {member.role === "OWNER" && (
                                <span className={groupMemberListModalStyles.ownerBadge}>
                                    <Crown
                                        size={13}
                                        strokeWidth={2}
                                        aria-hidden="true"
                                    />
                                    방장
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}