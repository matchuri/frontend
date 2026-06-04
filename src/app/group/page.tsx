"use client";

import { useState } from "react";
import { useAtomValue } from "jotai";

import type { LocationSetting } from "@/features/locationSetting/domain/model/LocationSetting";

import { useGroupList } from "@/features/group/application/hooks/useGroupList";
import { useGroupInvites } from "@/features/group/application/hooks/useGroupInvites";
import { useCreateGroup } from "@/features/group/application/hooks/useCreateGroup";
import { useGroupDetail } from "@/features/group/application/hooks/useGroupDetail";
import { useCreateGroupInvite } from "@/features/group/application/hooks/useCreateGroupInvite";
import { useRespondGroupInvite } from "@/features/group/application/hooks/useRespondGroupInvite";
import { useUpdateGroupName } from "@/features/group/application/hooks/useUpdateGroupName";

import {
    groupsAtom,
    hasGroupsAtom,
    isGroupListLoadingAtom,
    groupListErrorMessageAtom,
} from "@/features/group/application/selectors/groupSelectors";
import {
    invitesAtom,
    hasInvitesAtom,
    isInviteListLoadingAtom,
    inviteListErrorMessageAtom,
    shouldShowInviteViewAllButtonAtom,
} from "@/features/group/application/selectors/groupInviteSelectors";
import {
    groupDetailAtomValue,
    isGroupDetailLoadingAtom,
    groupDetailErrorMessageAtom,
} from "@/features/group/application/selectors/groupDetailSelectors";

import GroupCard from "@/features/group/ui/components/GroupCard";
import GroupListEmpty from "@/features/group/ui/components/GroupListEmpty";
import GroupManagementHeader from "@/features/group/ui/components/GroupManagementHeader";
import GroupCreateModal from "@/features/group/ui/components/GroupCreateModal";
import GroupDetailPanel from "@/features/group/ui/components/GroupDetailPanel";
import GroupInviteSection from "@/features/group/ui/components/GroupInviteSection";
import GroupInviteModal from "@/features/group/ui/components/GroupInviteModal";
import GroupInviteAllView from "@/features/group/ui/components/GroupInviteAllView";
import GroupMemberListModal from "@/features/group/ui/components/GroupMemberListModal";
import GroupNameEditModal from "@/features/group/ui/components/GroupNameEditModal";

import { groupManagementPageStyles } from "@/ui/styles/groupManagementPageStyles";

export default function GroupPage() {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
    const [isAllInviteViewOpen, setIsAllInviteViewOpen] = useState(false);
    const [isMemberListModalOpen, setIsMemberListModalOpen] = useState(false);
    const [isGroupNameEditModalOpen, setIsGroupNameEditModalOpen] = useState(false);

    const [groupName, setGroupName] = useState("");
    const [inviteNickname, setInviteNickname] = useState("");
    const [editingGroupName, setEditingGroupName] = useState("");
    const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);

    const { refetchGroups } = useGroupList();
    const { refetchInvites } = useGroupInvites();
    const { refetchGroupDetail } = useGroupDetail(selectedGroupId);

    const groups = useAtomValue(groupsAtom);
    const hasGroups = useAtomValue(hasGroupsAtom);
    const isGroupListLoading = useAtomValue(isGroupListLoadingAtom);
    const groupListErrorMessage = useAtomValue(groupListErrorMessageAtom);

    const invites = useAtomValue(invitesAtom);
    const hasInvites = useAtomValue(hasInvitesAtom);
    const isInviteListLoading = useAtomValue(isInviteListLoadingAtom);
    const inviteListErrorMessage = useAtomValue(inviteListErrorMessageAtom);
    const showViewAllButton = useAtomValue(shouldShowInviteViewAllButtonAtom);

    const groupDetail = useAtomValue(groupDetailAtomValue);
    const isGroupDetailLoading = useAtomValue(isGroupDetailLoadingAtom);
    const groupDetailErrorMessage = useAtomValue(groupDetailErrorMessageAtom);

    const { isCreating, create } = useCreateGroup({
        onSuccess: () => {
            refetchGroups();
            setGroupName("");
            setIsCreateModalOpen(false);
        },
    });

    const {
        isInviting,
        inviteMessage,
        invite,
        clearInviteMessage,
    } = useCreateGroupInvite({
        onSuccess: () => {
            setInviteNickname("");
        },
    });

    const { processingInviteId, respond } = useRespondGroupInvite({
        onSuccess: () => {
            refetchGroups();
            refetchInvites();
        },
    });

    const {
        isUpdating,
        updateMessage,
        update,
        clearUpdateMessage,
    } = useUpdateGroupName({
        onSuccess: () => {
            refetchGroups();
            refetchGroupDetail();
            setIsGroupNameEditModalOpen(false);
            setEditingGroupName("");
        },
    });

    const handleCreateGroup = async (location: LocationSetting) => {
        await create(groupName, location);
    };

    const handleInviteFriend = async () => {
        if (selectedGroupId === null) return;

        await invite(selectedGroupId, inviteNickname);
    };

    const handleAcceptInvite = async (inviteId: number) => {
        await respond(inviteId, "ACCEPT");
    };

    const handleDeclineInvite = async (inviteId: number) => {
        await respond(inviteId, "DECLINE");
    };

    const openGroupNameEditModal = () => {
        if (!groupDetail) return;

        setEditingGroupName(groupDetail.name);
        clearUpdateMessage();
        setIsGroupNameEditModalOpen(true);
    };

    const handleUpdateGroupName = async () => {
        if (selectedGroupId === null) return;

        await update(selectedGroupId, editingGroupName);
    };

    const closeInviteModal = () => {
        setIsInviteModalOpen(false);
        setInviteNickname("");
        clearInviteMessage();
    };

    const closeGroupNameEditModal = () => {
        setIsGroupNameEditModalOpen(false);
        setEditingGroupName("");
        clearUpdateMessage();
    };

    if (isAllInviteViewOpen) {
        return (
            <GroupInviteAllView
                invites={invites}
                onBack={() => setIsAllInviteViewOpen(false)}
                processingInviteId={processingInviteId}
                onAcceptInvite={handleAcceptInvite}
                onDeclineInvite={handleDeclineInvite}
            />
        );
    }

    return (
        <>
            <main className={groupManagementPageStyles.container}>
                <div className={groupManagementPageStyles.layout}>
                    <div className={groupManagementPageStyles.mainContent}>
                        <div className={groupManagementPageStyles.content}>
                            <GroupManagementHeader
                                onClickCreate={() => setIsCreateModalOpen(true)}
                            />

                            <GroupInviteSection
                                invites={invites}
                                hasInvites={hasInvites}
                                showViewAllButton={showViewAllButton}
                                isLoading={isInviteListLoading}
                                errorMessage={inviteListErrorMessage}
                                onClickViewAll={() => setIsAllInviteViewOpen(true)}
                                processingInviteId={processingInviteId}
                                onAcceptInvite={handleAcceptInvite}
                                onDeclineInvite={handleDeclineInvite}
                            />

                            <section className={groupManagementPageStyles.groupSection}>
                                <div className={groupManagementPageStyles.sectionHeader}>
                                    <h2 className={groupManagementPageStyles.sectionTitle}>
                                        그룹 목록
                                    </h2>
                                </div>

                                {isGroupListLoading && (
                                    <div className={groupManagementPageStyles.emptyGroupBox}>
                                        그룹 목록을 불러오는 중...
                                    </div>
                                )}

                                {groupListErrorMessage && (
                                    <div className={groupManagementPageStyles.emptyGroupBox}>
                                        {groupListErrorMessage}
                                    </div>
                                )}

                                {!isGroupListLoading &&
                                    !groupListErrorMessage &&
                                    (hasGroups ? (
                                        <div className={groupManagementPageStyles.groupList}>
                                            {groups.map((group) => (
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

                    {selectedGroupId !== null && isGroupDetailLoading && (
                        <aside className={groupManagementPageStyles.detailLoadingPanel}>
                            <div className={groupManagementPageStyles.detailMessageBox}>
                                그룹 정보를 불러오는 중...
                            </div>
                        </aside>
                    )}

                    {selectedGroupId !== null && groupDetailErrorMessage && (
                        <aside className={groupManagementPageStyles.detailLoadingPanel}>
                            <div className={groupManagementPageStyles.detailErrorBox}>
                                {groupDetailErrorMessage}
                            </div>
                        </aside>
                    )}

                    {selectedGroupId !== null && groupDetail && (
                        <GroupDetailPanel
                            group={groupDetail}
                            onClose={() => setSelectedGroupId(null)}
                            onClickInvite={() => setIsInviteModalOpen(true)}
                            onClickMemberMore={() => setIsMemberListModalOpen(true)}
                            onClickEditName={openGroupNameEditModal}
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

            <GroupInviteModal
                isOpen={isInviteModalOpen}
                nickname={inviteNickname}
                isInviting={isInviting}
                message={inviteMessage}
                onClose={closeInviteModal}
                onChangeNickname={setInviteNickname}
                onInvite={handleInviteFriend}
            />

            {groupDetail && (
                <GroupMemberListModal
                    isOpen={isMemberListModalOpen}
                    members={groupDetail.members}
                    onClose={() => setIsMemberListModalOpen(false)}
                />
            )}

            <GroupNameEditModal
                isOpen={isGroupNameEditModalOpen}
                groupName={editingGroupName}
                isUpdating={isUpdating}
                message={updateMessage}
                onClose={closeGroupNameEditModal}
                onChangeGroupName={setEditingGroupName}
                onSubmit={handleUpdateGroupName}
            />
        </>
    );
}