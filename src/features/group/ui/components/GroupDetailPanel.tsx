"use client";

import { ArrowLeft, Copy, MapPin, Plus, User } from "lucide-react";
import { useAtomValue } from "jotai";

import type { GroupDetail } from "@/features/group/domain/model/GroupDetail";

import { isGroupOwnerAtom } from "@/features/group/application/selectors/groupDetailSelectors";

import GroupDetailMoreButton from "@/features/group/ui/components/GroupDetailMoreButton";
import GroupRecommendationStartButton from "@/features/group/ui/components/GroupRecommendationStartButton";
import GroupMemberInviteButton from "@/features/group/ui/components/GroupMemberInviteButton";

import { groupDetailPanelStyles } from "@/ui/styles/groupDetailPanelStyles";

interface GroupDetailPanelProps {
    readonly group: GroupDetail;
    readonly onClose: () => void;
    readonly onClickInvite: () => void;
}

export default function GroupDetailPanel({
    group,
    onClose,
    onClickInvite,
}: GroupDetailPanelProps) {
    const visibleMembers = group.members.slice(0, 3);
    const isOwner = useAtomValue(isGroupOwnerAtom);

    return (
        <aside className={groupDetailPanelStyles.panel}>
            <div className={groupDetailPanelStyles.content}>
                <header className={groupDetailPanelStyles.header}>
                    <button
                        type="button"
                        onClick={onClose}
                        className={groupDetailPanelStyles.backButton}
                    >
                        <ArrowLeft size={22} />
                    </button>

                    <GroupDetailMoreButton />
                </header>

                <section>
                    <h2 className={groupDetailPanelStyles.groupTitle}>
                        {group.name}
                    </h2>

                    {group.location.address && (
                        <div className={groupDetailPanelStyles.address}>
                            <MapPin size={16} />
                            <span>{group.location.address}</span>
                        </div>
                    )}
                </section>

                <GroupRecommendationStartButton />

                <section className={groupDetailPanelStyles.memberSection}>
                    <div className={groupDetailPanelStyles.memberSectionHeader}>
                        <div>
                            <h3 className={groupDetailPanelStyles.memberSectionTitle}>
                                참여 멤버
                            </h3>

                            <p className={groupDetailPanelStyles.memberCountText}>
                                총 {group.members.length}명이 함께 하고있습니다
                            </p>
                        </div>

                        {isOwner && (
                            <GroupMemberInviteButton
                                onClick={onClickInvite}
                            />
                        )}
                    </div>

                    <div className={groupDetailPanelStyles.memberList}>
                        {visibleMembers.map((member) => (
                            <div
                                key={member.memberId}
                                className={groupDetailPanelStyles.memberCard}
                            >
                                <div className={groupDetailPanelStyles.memberAvatar}>
                                    <User size={34} />
                                </div>

                                <span className={groupDetailPanelStyles.memberNickname}>
                                    {member.nickname}
                                    {member.isMe && " (나)"}
                                </span>

                                <span
                                    className={
                                        member.role === "OWNER"
                                            ? groupDetailPanelStyles.ownerRoleBadge
                                            : groupDetailPanelStyles.memberRoleBadge
                                    }
                                >
                                    {member.role === "OWNER" ? "방장" : "멤버"}
                                </span>
                            </div>
                        ))}

                        {group.members.length > 3 && (
                            <button
                                type="button"
                                className={groupDetailPanelStyles.memberMoreButton}
                            >
                                <Plus size={28} />
                                <span>모두 보기</span>
                            </button>
                        )}
                    </div>
                </section>

                <section className={groupDetailPanelStyles.inviteCodeSection}>
                    <div>
                        <span className={groupDetailPanelStyles.inviteCodeLabel}>
                            초대 코드
                        </span>

                        <strong className={groupDetailPanelStyles.inviteCodeValue}>
                            {group.inviteCode}
                        </strong>
                    </div>

                    <button
                        type="button"
                        className={groupDetailPanelStyles.copyInviteCodeButton}
                    >
                        <Copy size={20} />
                    </button>
                </section>

                <section className={groupDetailPanelStyles.activitySection}>
                    <div className={groupDetailPanelStyles.emptyActivityBox}>
                        최근 활동이 없습니다.
                    </div>
                </section>
            </div>
        </aside>
    );
}