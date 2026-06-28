"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";

import type { LocationSetting } from "@/features/locationSetting/domain/model/LocationSetting";

import { useGroupList } from "@/features/group/application/hooks/useGroupList";
import { useGroupInvites } from "@/features/group/application/hooks/useGroupInvites";
import { useCreateGroup } from "@/features/group/application/hooks/useCreateGroup";
import { useGroupDetail } from "@/features/group/application/hooks/useGroupDetail";
import { useCreateGroupInvite } from "@/features/group/application/hooks/useCreateGroupInvite";
import { useRespondGroupInvite } from "@/features/group/application/hooks/useRespondGroupInvite";
import { useUpdateGroupName } from "@/features/group/application/hooks/useUpdateGroupName";
import { useUpdateGroupLocation } from "@/features/group/application/hooks/useUpdateGroupLocation";
import { useDeleteGroup } from "@/features/group/application/hooks/useDeleteGroup";
import { useLeaveGroup } from "@/features/group/application/hooks/useLeaveGroup";
import { useMyRealtimeEvents } from "@/features/group/application/hooks/useMyRealtimeEvents";
import { useStartGroupRecommendation } from "@/features/groupRecommendation/application/hooks/useStartGroupRecommendation";
import { useGroupRealtimeEvents } from "@/features/group/application/hooks/useGroupRealtimeEvents";
import type { GroupDeletedEvent } from "@/features/group/infrastructure/sse/dto/GroupDeletedEvent";
import type { GroupRecommendationStartedEvent } from "@/features/group/infrastructure/sse/dto/GroupRecommendationStartedEvent";

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
import {
    accessTokenAtom,
    memberAtom,
} from "@/features/auth/application/selectors/authSelectors";

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
import GroupLocationEditModal from "@/features/group/ui/components/GroupLocationEditModal";
import GroupDeleteModal from "@/features/group/ui/components/GroupDeleteModal";
import GroupLeaveModal from "@/features/group/ui/components/GroupLeaveModal";

import { groupManagementPageStyles } from "@/ui/styles/groupManagementPageStyles";

export default function GroupPage() {
    const router = useRouter();

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
    const [isAllInviteViewOpen, setIsAllInviteViewOpen] = useState(false);
    const [isMemberListModalOpen, setIsMemberListModalOpen] = useState(false);
    const [isGroupNameEditModalOpen, setIsGroupNameEditModalOpen] = useState(false);
    const [isLocationEditModalOpen, setIsLocationEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);

    const [groupName, setGroupName] = useState("");
    const [inviteNickname, setInviteNickname] = useState("");
    const [editingGroupName, setEditingGroupName] = useState("");
    const [editingLocation, setEditingLocation] = useState<LocationSetting | null>(null);
    const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
    const [realtimeNoticeMessage, setRealtimeNoticeMessage] = useState<string | null>(null);

    const handledRecommendationStartedEventIds = useRef<Set<string>>(new Set());

    const accessToken = useAtomValue(accessTokenAtom);
    const member = useAtomValue(memberAtom);

    const groups = useAtomValue(groupsAtom);
    const hasGroups = useAtomValue(hasGroupsAtom);
    const isGroupListLoading = useAtomValue(isGroupListLoadingAtom);
    const groupListErrorMessage = useAtomValue(groupListErrorMessageAtom);

    const groupDetail = useAtomValue(groupDetailAtomValue);
    const isGroupDetailLoading = useAtomValue(isGroupDetailLoadingAtom);
    const groupDetailErrorMessage = useAtomValue(groupDetailErrorMessageAtom);

    useMyRealtimeEvents({accessToken});

    const { refetchGroups } = useGroupList();
    const { refetchInvites } = useGroupInvites();

    const handleGroupNotFound = useCallback(() => {
        setSelectedGroupId(null);

        refetchGroups();

        setRealtimeNoticeMessage(
            "그룹이 삭제되어 더 이상 접근할 수 없습니다.",
        );
    }, [refetchGroups]);

    const { refetchGroupDetail } = useGroupDetail(selectedGroupId, {
        onGroupNotFound: handleGroupNotFound,
    });

    const handleMemberJoined = useCallback(() => {
        refetchGroups();
        refetchGroupDetail();
    }, [refetchGroups, refetchGroupDetail]);

    const handleMemberLeft = useCallback(() => {
        refetchGroups();
        refetchGroupDetail();
    }, [refetchGroups, refetchGroupDetail]);

    const handleGroupDeleted = useCallback(
        (event: GroupDeletedEvent) => {
            const isCurrentGroupDeleted =
                selectedGroupId === event.payload.groupId;

            if (isCurrentGroupDeleted) {
                setSelectedGroupId(null);

                const isDeletedByMe =
                    member?.id === event.payload.deletedByMemberId;

                if (!isDeletedByMe) {
                    setRealtimeNoticeMessage(
                        "그룹이 삭제되어 더 이상 접근할 수 없습니다.",
                    );
                }
            }

            refetchGroups();
        },
        [member?.id, refetchGroups, selectedGroupId],
    );

    const handleRecommendationStarted = useCallback(
        async (event: GroupRecommendationStartedEvent) => {
            if (handledRecommendationStartedEventIds.current.has(event.eventId)) {
                return;
            }

            handledRecommendationStartedEventIds.current.add(event.eventId);

            refetchGroups();

            if (selectedGroupId !== event.groupId) {
                return;
            }

            await refetchGroupDetail();

            const isStartedByMe = member?.id === event.actorMemberId;

            if (!isStartedByMe) {
                router.push(
                    `/group/${event.groupId}/recommendations/${event.sessionId}`,
                );
            }
        },
        [
            member?.id,
            refetchGroupDetail,
            refetchGroups,
            router,
            selectedGroupId,
        ],
    );

    useGroupRealtimeEvents({
        accessToken,
        groupId: selectedGroupId,
        onMemberJoined: handleMemberJoined,
        onMemberLeft: handleMemberLeft,
        onGroupDeleted: handleGroupDeleted,
        onRecommendationStarted: handleRecommendationStarted,
    });

    // 실시간 그룹 삭제 안내 메시지 3초 후 자동 제거
    useEffect(() => {
        if (!realtimeNoticeMessage) {
            return;
        }

        const timer = window.setTimeout(() => {
            setRealtimeNoticeMessage(null);
        }, 3000);

        return () => {
            window.clearTimeout(timer);
        };
    }, [realtimeNoticeMessage]);

    const invites = useAtomValue(invitesAtom);
    const hasInvites = useAtomValue(hasInvitesAtom);
    const isInviteListLoading = useAtomValue(isInviteListLoadingAtom);
    const inviteListErrorMessage = useAtomValue(inviteListErrorMessageAtom);
    const showViewAllButton = useAtomValue(shouldShowInviteViewAllButtonAtom);

    const { start } = useStartGroupRecommendation({
        onSuccess: (sessionId) => {
            router.push(
                `/group/${selectedGroupId}/recommendations/${sessionId}`,
            );
        },
    });

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

    const {
        isUpdating: isUpdatingLocation,
        update: updateLocation,
        clearMessage: clearLocationUpdateMessage,
    } = useUpdateGroupLocation();

    const { isDeleting, removeGroup } = useDeleteGroup({
        onSuccess: () => {
            refetchGroups();
            setIsDeleteModalOpen(false);
            setSelectedGroupId(null);
        },
    });

    const { isLeaving, leave } = useLeaveGroup({
        onSuccess: () => {
            refetchGroups();
            setIsLeaveModalOpen(false);
            setSelectedGroupId(null);
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

    const openLocationEditModal = () => {
        if (!groupDetail) return;

        setEditingLocation({
            latitude: groupDetail.location.latitude,
            longitude: groupDetail.location.longitude,
            address: groupDetail.location.address,
            level: 4,
        });

        clearLocationUpdateMessage();
        setIsLocationEditModalOpen(true);
    };

    const handleUpdateLocation = async (
        location: LocationSetting,
    ) => {
        if (selectedGroupId === null) return;

        console.log("수정 요청 위치", {
            groupId: selectedGroupId,
            latitude: location.latitude,
            longitude: location.longitude,
            address: location.address,
            level: location.level,
        });

        await updateLocation(
            selectedGroupId,
            location.latitude,
            location.longitude,
            location.address,
        );

        // 위치 수정 후 최신 상세 정보를 다시 조회
        await refetchGroupDetail();

        // 상세 재조회 이후 모달 상태 초기화
        setIsLocationEditModalOpen(false);
        setEditingLocation(null);
    };

    const handleMoveActiveRecommendation = () => {
        if (selectedGroupId === null || !groupDetail?.recentlyRecommendation) {
            return;
        }

        const { sessionId, status } = groupDetail.recentlyRecommendation;

        if (status === "PREPARING") {
            router.push(`/group/${selectedGroupId}/recommendations/${sessionId}`);
            return;
        }

        router.push(`/group/${selectedGroupId}/recommendations/${sessionId}/result`);
    };

    const handleStartRecommendation = async () => {
        if (selectedGroupId === null || !groupDetail) {
            return;
        }

        const runningRecommendation =
            groupDetail.recentlyRecommendation?.status === "PREPARING" ||
            groupDetail.recentlyRecommendation?.status === "OPEN";

        if (runningRecommendation) {
            handleMoveActiveRecommendation();
            return;
        }

        if (!groupDetail.location.address) {
            alert("그룹 위치 주소가 없습니다. 그룹 위치를 먼저 수정해주세요.");
            return;
        }

        await start(selectedGroupId, {
            latitude: groupDetail.location.latitude,
            longitude: groupDetail.location.longitude,
            address: groupDetail.location.address,
            radiusMeters: groupDetail.location.radiusMeters,
        });
    };

    const openDeleteModal = () => {
        setIsDeleteModalOpen(true);
    };

    const handleDeleteGroup = async () => {
        if (selectedGroupId === null) return;

        await removeGroup(selectedGroupId);
    };

    const handleLeaveGroup = async () => {
        if (selectedGroupId === null) return;

        await leave(selectedGroupId);
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

    const closeLocationEditModal = () => {
        setIsLocationEditModalOpen(false);
        setEditingLocation(null);
        clearLocationUpdateMessage();
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
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
                            {realtimeNoticeMessage && (
                                <div className={groupManagementPageStyles.realtimeNotice}>
                                    {realtimeNoticeMessage}
                                </div>
                            )}

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
                            onClickEditLocation={openLocationEditModal}
                            onClickDeleteGroup={openDeleteModal}
                            onClickLeaveGroup={() => setIsLeaveModalOpen(true)}
                            onClickStartRecommendation={handleStartRecommendation}
                            onClickMoveActiveRecommendation={handleMoveActiveRecommendation}
                            onClickOpenRestaurantMap={() => alert("기능 준비중입니다.")}
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

            {isLocationEditModalOpen && editingLocation && (
                <GroupLocationEditModal
                    location={editingLocation}
                    isUpdating={isUpdatingLocation}
                    onClose={closeLocationEditModal}
                    onSubmit={handleUpdateLocation}
                />
            )}

            <GroupDeleteModal
                isOpen={isDeleteModalOpen}
                isDeleting={isDeleting}
                onClose={closeDeleteModal}
                onDelete={handleDeleteGroup}
            />

            <GroupLeaveModal
                isOpen={isLeaveModalOpen}
                isLeaving={isLeaving}
                onClose={() => setIsLeaveModalOpen(false)}
                onLeave={handleLeaveGroup}
            />
        </>
    );
}