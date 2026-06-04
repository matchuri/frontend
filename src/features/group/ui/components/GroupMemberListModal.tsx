"use client";

import { ArrowLeft, User } from "lucide-react";

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

    return (
        <div className={groupMemberListModalStyles.overlay}>
            <div className={groupMemberListModalStyles.modal}>
                <button
                    type="button"
                    onClick={onClose}
                    className={groupMemberListModalStyles.backButton}
                >
                    <ArrowLeft size={22} />
                </button>

                <div className={groupMemberListModalStyles.content}>
                    <h2 className={groupMemberListModalStyles.title}>
                        모든 멤버
                    </h2>

                    <div className={groupMemberListModalStyles.memberList}>
                        {members.map((member) => (
                            <div
                                key={member.memberId}
                                className={groupMemberListModalStyles.memberCard}
                            >
                                <div className={groupMemberListModalStyles.avatar}>
                                    <User size={32} />
                                </div>

                                <span className={groupMemberListModalStyles.nickname}>
                                    {member.nickname}
                                    {member.isMe && " (나)"}
                                </span>

                                <span
                                    className={
                                        member.role === "OWNER"
                                            ? groupMemberListModalStyles.ownerRoleBadge
                                            : groupMemberListModalStyles.memberRoleBadge
                                    }
                                >
                                    {member.role === "OWNER" ? "방장" : "멤버"}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}