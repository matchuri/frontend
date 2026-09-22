"use client";

import { useState } from "react";
import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";

import type { LocationSetting } from "@/features/locationSetting/domain/model/LocationSetting";

import { useGroupList } from "@/features/group/application/hooks/useGroupList";
import { useGroupInvites } from "@/features/group/application/hooks/useGroupInvites";
import { useCreateGroup } from "@/features/group/application/hooks/useCreateGroup";
import { useRespondGroupInvite } from "@/features/group/application/hooks/useRespondGroupInvite";
import { useMyRealtimeEvents } from "@/features/group/application/hooks/useMyRealtimeEvents";

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
import { accessTokenAtom } from "@/features/auth/application/selectors/authSelectors";

import GroupCard from "@/features/group/ui/components/GroupCard";
import GroupListEmpty from "@/features/group/ui/components/GroupListEmpty";
import GroupManagementHeader from "@/features/group/ui/components/GroupManagementHeader";
import GroupCreateModal from "@/features/group/ui/components/GroupCreateModal";
import GroupInviteSection from "@/features/group/ui/components/GroupInviteSection";
import GroupInviteAllView from "@/features/group/ui/components/GroupInviteAllView";
import AuthRequiredGuard from "@/features/routeGuard/ui/components/AuthRequiredGuard";

import { groupManagementPageStyles } from "@/ui/styles/groupManagementPageStyles";

export default function GroupPage() {
    return (
        <AuthRequiredGuard>
            <GroupPageContent />
        </AuthRequiredGuard>
    );
}

function GroupPageContent() {
    const router = useRouter();

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isAllInviteViewOpen, setIsAllInviteViewOpen] = useState(false);

    const [groupName, setGroupName] = useState("");

    const accessToken = useAtomValue(accessTokenAtom);

    const groups = useAtomValue(groupsAtom);
    const hasGroups = useAtomValue(hasGroupsAtom);
    const isGroupListLoading = useAtomValue(isGroupListLoadingAtom);
    const groupListErrorMessage = useAtomValue(groupListErrorMessageAtom);

    useMyRealtimeEvents({accessToken});

    const { refetchGroups } = useGroupList();
    const { refetchInvites } = useGroupInvites();

    const invites = useAtomValue(invitesAtom);
    const hasInvites = useAtomValue(hasInvitesAtom);
    const isInviteListLoading = useAtomValue(isInviteListLoadingAtom);
    const inviteListErrorMessage = useAtomValue(inviteListErrorMessageAtom);
    const showViewAllButton = useAtomValue(shouldShowInviteViewAllButtonAtom);

    const { isCreating, create } = useCreateGroup({
        onSuccess: () => {
            refetchGroups();
            setGroupName("");
            setIsCreateModalOpen(false);
        },
    });

    const { processingInviteId, respond } = useRespondGroupInvite({
        onSuccess: () => {
            refetchGroups();
            refetchInvites();
        },
    });

    const handleCreateGroup = async (location: LocationSetting) => {
        await create(groupName, location);
    };

    const handleAcceptInvite = async (inviteId: number) => {
        await respond(inviteId, "ACCEPT");
    };

    const handleDeclineInvite = async (inviteId: number) => {
        await respond(inviteId, "DECLINE");
    };

    const handleClickGroup = (groupId: number) => {
        router.push(`/group/${groupId}`);
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
                                                    onClick={() => handleClickGroup(group.id)}
                                                />
                                            ))}
                                        </div>
                                    ) : (
                                        <GroupListEmpty />
                                    ))}
                            </section>
                        </div>
                    </div>
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