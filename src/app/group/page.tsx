"use client";

import { useState } from "react";

import type { LocationSetting } from "@/features/locationSetting/domain/model/LocationSetting";

import { useGroupList } from "@/features/group/application/hooks/useGroupList";
import { useCreateGroup } from "@/features/group/application/hooks/useCreateGroup";
import { useGroupDetail } from "@/features/group/application/hooks/useGroupDetail";

import { mockInvites } from "@/features/group/ui/mock/mockInvites";

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
    const { groupDetailState } = useGroupDetail(selectedGroupId);

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
                                                    isSelected={
                                                        selectedGroupId === group.id
                                                    }
                                                    onClick={() =>
                                                        setSelectedGroupId(group.id)
                                                    }
                                                />
                                            ))}
                                        </div>
                                    ) : (
                                        <GroupListEmpty />
                                    ))}
                            </section>
                        </div>
                    </div>

                    {selectedGroupId !== null &&
                        groupDetailState.status === "LOADING" && (
                            <aside className={groupManagementPageStyles.detailLoadingPanel}>
                                <div className={groupManagementPageStyles.detailMessageBox}>
                                    그룹 정보를 불러오는 중...
                                </div>
                            </aside>
                        )}

                    {selectedGroupId !== null &&
                        groupDetailState.status === "ERROR" && (
                            <aside className={groupManagementPageStyles.detailLoadingPanel}>
                                <div className={groupManagementPageStyles.detailErrorBox}>
                                    {groupDetailState.message}
                                </div>
                            </aside>
                        )}

                    {selectedGroupId !== null &&
                        groupDetailState.status === "SUCCESS" && (
                            <GroupDetailPanel
                                group={groupDetailState.data}
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