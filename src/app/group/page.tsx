"use client";

import {
    useCallback,
    useState,
} from "react";
import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";

import type { LocationSetting } from "@/features/locationSetting/domain/model/LocationSetting";

import { useGroupList } from "@/features/group/application/hooks/useGroupList";
import { useCreateGroup } from "@/features/group/application/hooks/useCreateGroup";
import { useRespondGroupInvite } from "@/features/group/application/hooks/useRespondGroupInvite";
import { useMyRealtimeEvents } from "@/features/group/application/hooks/useMyRealtimeEvents";
import { useGroupInviteExists } from "@/features/groupInviteNotification/application/hooks/useGroupInviteExists";
import { useGroupInviteNotifications } from "@/features/groupInviteNotification/application/hooks/useGroupInviteNotifications";

import {
    groupsAtom,
    hasGroupsAtom,
    isGroupListLoadingAtom,
    groupListErrorMessageAtom,
} from "@/features/group/application/selectors/groupSelectors";
import { accessTokenAtom } from "@/features/auth/application/selectors/authSelectors";

import GroupCard from "@/features/group/ui/components/GroupCard";
import GroupListEmpty from "@/features/group/ui/components/GroupListEmpty";
import GroupManagementHeader from "@/features/group/ui/components/GroupManagementHeader";
import GroupCreateButton from "@/features/group/ui/components/GroupCreateButton";
import GroupCreateModal from "@/features/group/ui/components/GroupCreateModal";
import GroupInviteNotification from "@/features/groupInviteNotification/ui/components/GroupInviteNotification";
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
    const [isInviteNotificationOpen, setIsInviteNotificationOpen] = useState(false);
    const [groupName, setGroupName] = useState("");

    const accessToken = useAtomValue(accessTokenAtom);

    const groups = useAtomValue(groupsAtom);
    const hasGroups = useAtomValue(hasGroupsAtom);
    const isGroupListLoading = useAtomValue(isGroupListLoadingAtom);
    const groupListErrorMessage = useAtomValue(groupListErrorMessageAtom);

    const { refetchGroups } = useGroupList();

    const {
        hasInvite,
        refetchInviteExists,
    } = useGroupInviteExists();

    const {
        invites,
        refetchInvites,
    } = useGroupInviteNotifications();

    const handleGroupInviteCreated =
        useCallback(() => {
            void refetchInvites();
            void refetchInviteExists();
        }, [
            refetchInvites,
            refetchInviteExists,
        ]);

    useMyRealtimeEvents({
        accessToken,
        onGroupInviteCreated: handleGroupInviteCreated,
    });

    const { isCreating, create } = useCreateGroup({
        onSuccess: () => {
            void refetchGroups();
            setGroupName("");
            setIsCreateModalOpen(false);
        },
    });

    const { processingInviteId, respond } = useRespondGroupInvite({
        onSuccess: () => {
            void refetchGroups();
            void refetchInvites();
            void refetchInviteExists();
        },
    });

    const handleCreateGroup = async (location: LocationSetting) => {
        await create(groupName, location);
    };

    const handleClickNotification = () => {
        setIsInviteNotificationOpen((prev) => !prev);
    };

    const handleAcceptInvite = (inviteId: number) => {
        if (processingInviteId !== null) {
            return;
        }

        void respond(inviteId, "ACCEPT");
    };

    const handleDeclineInvite = (inviteId: number) => {
        if (processingInviteId !== null) {
            return;
        }

        void respond(inviteId, "DECLINE");
    };

    const handleClickGroup = (groupId: number) => {
        router.push(`/group/${groupId}`);
    };

    return (
        <>
            <main className={groupManagementPageStyles.container}>
                <GroupManagementHeader
                    hasInvites={hasInvite}
                    isNotificationOpen={isInviteNotificationOpen}
                    onClickNotification={handleClickNotification}
                />

                {isInviteNotificationOpen && (
                    <GroupInviteNotification
                        invites={invites}
                        processingInviteId={processingInviteId}
                        onAcceptInvite={handleAcceptInvite}
                        onDeclineInvite={handleDeclineInvite}
                        onClose={() => setIsInviteNotificationOpen(false)}
                    />
                )}

                <div className={groupManagementPageStyles.content}>
                    <section className={groupManagementPageStyles.groupSection}>
                        <div className={groupManagementPageStyles.sectionHeader}>
                            <h2 className={groupManagementPageStyles.sectionTitle}>
                                내 그룹
                            </h2>

                            <GroupCreateButton
                                onClick={() => setIsCreateModalOpen(true)}
                            />
                        </div>

                        {isGroupListLoading && (
                            <div className={groupManagementPageStyles.stateBox}>
                                그룹 목록을 불러오는 중...
                            </div>
                        )}

                        {groupListErrorMessage && (
                            <div className={groupManagementPageStyles.errorBox}>
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