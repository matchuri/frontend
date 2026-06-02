"use client";

import { useState } from "react";

import type { LocationSetting } from "@/features/locationSetting/domain/model/LocationSetting";
import { useGroupList } from "@/features/group/application/hooks/useGroupList";
import { useCreateGroup } from "@/features/group/application/hooks/useCreateGroup";
import { mockInvites } from "@/features/group/ui/mock/mockInvites";
import { mockGroupDetailPanel } from "@/features/group/ui/mock/mockGroupDetailPanel";

import GroupCard from "@/features/group/ui/components/GroupCard";
import GroupInviteCard from "@/features/group/ui/components/GroupInviteCard";
import GroupInviteEmpty from "@/features/group/ui/components/GroupInviteEmpty";
import GroupListEmpty from "@/features/group/ui/components/GroupListEmpty";
import GroupManagementHeader from "@/features/group/ui/components/GroupManagementHeader";
import GroupCreateModal from "@/features/group/ui/components/GroupCreateModal";
import GroupDetailPanel from "@/features/group/ui/components/GroupDetailPanel";

import { groupManagementPageStyles } from "@/ui/styles/groupManagementPageStyles";

export default function GroupPage() {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [groupName, setGroupName] = useState("");
    const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);

    const { groupState, refetchGroups } = useGroupList();

    const { isCreating, create } = useCreateGroup({
        onSuccess: () => {
            refetchGroups();
            setGroupName("");
            setIsCreateModalOpen(false);
        },
    });

    const hasInvites = mockInvites.length > 0;
    const showViewAllButton = mockInvites.length >= 3;

    const handleCreateGroup = async (location: LocationSetting) => {
        await create(groupName, location);
    };

    return (
        <>
            <main className={groupManagementPageStyles.container}>
                <div className={groupManagementPageStyles.layout}>
                    <div className={groupManagementPageStyles.mainContent}>
                        <div className={groupManagementPageStyles.content}>
                            <GroupManagementHeader
                                onClickCreate={() => setIsCreateModalOpen(true)}
                            />

                            <section className={groupManagementPageStyles.section}>
                                <div className={groupManagementPageStyles.sectionHeader}>
                                    <div className={groupManagementPageStyles.sectionTitleWrapper}>
                                        <h2 className={groupManagementPageStyles.sectionTitle}>
                                            받은 초대
                                        </h2>

                                        {hasInvites && (
                                            <span className={groupManagementPageStyles.inviteCount}>
                                                {mockInvites.length}
                                            </span>
                                        )}
                                    </div>

                                    {showViewAllButton && (
                                        <button
                                            type="button"
                                            className={groupManagementPageStyles.viewAllButton}
                                        >
                                            모두 보기
                                        </button>
                                    )}
                                </div>

                                {hasInvites ? (
                                    <div className={groupManagementPageStyles.inviteList}>
                                        {mockInvites.slice(0, 2).map((invite) => (
                                            <GroupInviteCard
                                                key={invite.inviteId}
                                                invite={invite}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <GroupInviteEmpty />
                                )}
                            </section>

                            <section className={groupManagementPageStyles.groupSection}>
                                <div className={groupManagementPageStyles.sectionHeader}>
                                    <h2 className={groupManagementPageStyles.sectionTitle}>
                                        그룹 목록
                                    </h2>
                                </div>

                                {groupState.status === "LOADING" && (
                                    <div className={groupManagementPageStyles.emptyGroupBox}>
                                        그룹 목록을 불러오는 중...
                                    </div>
                                )}

                                {groupState.status === "ERROR" && (
                                    <div className={groupManagementPageStyles.emptyGroupBox}>
                                        {groupState.message}
                                    </div>
                                )}

                                {groupState.status === "SUCCESS" &&
                                    (groupState.data.length > 0 ? (
                                        <div className={groupManagementPageStyles.groupList}>
                                            {groupState.data.map((group) => (
                                                <GroupCard
                                                    key={group.id}
                                                    group={group}
                                                    isSelected={selectedGroupId === group.id}
                                                    onClick={() => setSelectedGroupId(group.id)}
                                                />
                                            ))}
                                        </div>
                                    ) : (
                                        <GroupListEmpty />
                                    ))}
                            </section>
                        </div>
                    </div>

                    {selectedGroupId !== null && (
                        <GroupDetailPanel
                            group={mockGroupDetailPanel}
                            onClose={() => setSelectedGroupId(null)}
                        />
                    )}
                </div>
            </main>

            <GroupCreateModal
                isOpen={isCreateModalOpen}
                groupName={groupName}
                isCreating={isCreating}
                onClose={() => setIsCreateModalOpen(false)}
                onChangeGroupName={setGroupName}
                onCreate={handleCreateGroup}
            />
        </>
    );
}