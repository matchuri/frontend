"use client";

import { useCallback, useRef, useState } from "react";
import { useAtomValue } from "jotai";
import { useParams, useRouter } from "next/navigation";

import type { LocationSetting } from "@/features/locationSetting/domain/model/LocationSetting";
import { DEFAULT_MAP_LEVEL } from "@/features/map/domain/config/mapPolicy";

import { useGroupList } from "@/features/group/application/hooks/useGroupList";
import { useGroupDetail } from "@/features/group/application/hooks/useGroupDetail";
import { useCreateGroupInvite } from "@/features/group/application/hooks/useCreateGroupInvite";
import { useUpdateGroupName } from "@/features/group/application/hooks/useUpdateGroupName";
import { useUpdateGroupLocation } from "@/features/group/application/hooks/useUpdateGroupLocation";
import { useDeleteGroup } from "@/features/group/application/hooks/useDeleteGroup";
import { useLeaveGroup } from "@/features/group/application/hooks/useLeaveGroup";
import { useStartGroupRecommendation } from "@/features/groupRecommendation/application/hooks/useStartGroupRecommendation";
import { useGroupRealtimeEvents } from "@/features/group/application/hooks/useGroupRealtimeEvents";
import type { GroupDeletedEvent } from "@/features/group/infrastructure/sse/dto/GroupDeletedEvent";
import type { GroupRecommendationStartedEvent } from "@/features/group/infrastructure/sse/dto/GroupRecommendationStartedEvent";

import {
    groupDetailAtomValue,
    isGroupDetailLoadingAtom,
    groupDetailErrorMessageAtom,
} from "@/features/group/application/selectors/groupDetailSelectors";
import {
    accessTokenAtom,
    memberAtom,
} from "@/features/auth/application/selectors/authSelectors";

import GroupDetailPanel from "@/features/group/ui/components/GroupDetailPanel";
import GroupInviteModal from "@/features/group/ui/components/GroupInviteModal";
import GroupDeleteModal from "@/features/group/ui/components/GroupDeleteModal";
import GroupLeaveModal from "@/features/group/ui/components/GroupLeaveModal";
import LocationModal from "@/features/locationSetting/ui/components/LocationModal";
import AuthRequiredGuard from "@/features/routeGuard/ui/components/AuthRequiredGuard";

import { groupDetailPanelStyles } from "@/ui/styles/groupDetailPanelStyles";

export default function GroupDetailPage() {
    return (
        <AuthRequiredGuard>
            <GroupDetailPageContent />
        </AuthRequiredGuard>
    );
}

function GroupDetailPageContent() {
    const params = useParams<{ groupId: string }>();
    const router = useRouter();

    const groupId = Number(params.groupId);

    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
    const [isLocationEditModalOpen, setIsLocationEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);

    const [inviteNickname, setInviteNickname] = useState("");
    const [editingLocation, setEditingLocation] = useState<LocationSetting | null>(null);

    const handledRecommendationStartedEventIds = useRef<Set<string>>(new Set());

    const accessToken = useAtomValue(accessTokenAtom);
    const member = useAtomValue(memberAtom);

    const groupDetail = useAtomValue(groupDetailAtomValue);
    const isGroupDetailLoading = useAtomValue(isGroupDetailLoadingAtom);
    const groupDetailErrorMessage = useAtomValue(groupDetailErrorMessageAtom);

    const { refetchGroups } = useGroupList();

    const handleGroupNotFound = useCallback(() => {
        refetchGroups();
        router.replace("/group");
    }, [refetchGroups, router]);

    const { refetchGroupDetail } = useGroupDetail(groupId, {
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
            if (groupId !== event.payload.groupId) {
                return;
            }

            refetchGroups();
            router.replace("/group");
        },
        [groupId, refetchGroups, router],
    );

    const handleRecommendationStarted = useCallback(
        async (event: GroupRecommendationStartedEvent) => {
            if (handledRecommendationStartedEventIds.current.has(event.eventId)) {
                return;
            }

            handledRecommendationStartedEventIds.current.add(event.eventId);

            refetchGroups();

            if (groupId !== event.groupId) {
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
            groupId,
            member?.id,
            refetchGroupDetail,
            refetchGroups,
            router,
        ],
    );

    useGroupRealtimeEvents({
        accessToken,
        groupId,
        onMemberJoined: handleMemberJoined,
        onMemberLeft: handleMemberLeft,
        onGroupDeleted: handleGroupDeleted,
        onRecommendationStarted: handleRecommendationStarted,
    });

    const { start } = useStartGroupRecommendation({
        onSuccess: (sessionId) => {
            router.push(
                `/group/${groupId}/recommendations/${sessionId}`,
            );
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

    const {
        isUpdating,
        updateMessage,
        update,
        clearUpdateMessage,
    } = useUpdateGroupName({
        onSuccess: () => {
            refetchGroups();
            refetchGroupDetail();
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
            router.replace("/group");
        },
    });

    const { isLeaving, leave } = useLeaveGroup({
        onSuccess: () => {
            refetchGroups();
            setIsLeaveModalOpen(false);
            router.replace("/group");
        },
    });

    const handleInviteFriend = async () => {
        await invite(groupId, inviteNickname);
    };

    const handleUpdateGroupName = async (
        groupName: string,
    ) => {
        clearUpdateMessage();

        await update(groupId, groupName);
    };

    const openLocationEditModal = () => {
        if (!groupDetail) {
            return;
        }

        setEditingLocation({
            latitude: groupDetail.location.latitude,
            longitude: groupDetail.location.longitude,
            address: groupDetail.location.address,
            radiusMeters: groupDetail.location.radiusMeters,
            level: DEFAULT_MAP_LEVEL,
        });

        clearLocationUpdateMessage();
        setIsLocationEditModalOpen(true);
    };

    const handleUpdateLocation = async (
        location: LocationSetting,
    ) => {
        await updateLocation(
            groupId,
            location,
        );

        await refetchGroupDetail();

        setIsLocationEditModalOpen(false);
        setEditingLocation(null);

        return true;
    };

    const handleMoveActiveRecommendation = () => {
        if (!groupDetail?.recentlyRecommendation) {
            return;
        }

        const { sessionId, status } = groupDetail.recentlyRecommendation;

        if (status === "PREPARING") {
            router.push(`/group/${groupId}/recommendations/${sessionId}`);
            return;
        }

        router.push(`/group/${groupId}/recommendations/${sessionId}/result`);
    };

    const handleStartRecommendation = async () => {
        if (!groupDetail) {
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

        await start(groupId, {
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
        await removeGroup(groupId);
    };

    const handleLeaveGroup = async () => {
        await leave(groupId);
    };

    const handleClickBack = () => {
        router.push("/group");
    };

    const closeInviteModal = () => {
        setIsInviteModalOpen(false);
        setInviteNickname("");
        clearInviteMessage();
    };

    const closeLocationEditModal = () => {
        setIsLocationEditModalOpen(false);
        setEditingLocation(null);
        clearLocationUpdateMessage();
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    if (isGroupDetailLoading) {
        return (
            <main className={groupDetailPanelStyles.container}>
                <div className={groupDetailPanelStyles.detailMessageBox}>
                    그룹 정보를 불러오는 중...
                </div>
            </main>
        );
    }

    if (groupDetailErrorMessage) {
        return (
            <main className={groupDetailPanelStyles.container}>
                <div className={groupDetailPanelStyles.detailErrorBox}>
                    {groupDetailErrorMessage}
                </div>
            </main>
        );
    }

    if (!groupDetail) {
        return null;
    }

    return (
        <>
            <main className={groupDetailPanelStyles.container}>
                <GroupDetailPanel
                    group={groupDetail}
                    isUpdatingGroupName={isUpdating}
                    groupNameUpdateMessage={updateMessage}
                    onClose={handleClickBack}
                    onClickInvite={() => setIsInviteModalOpen(true)}
                    onUpdateGroupName={handleUpdateGroupName}
                    onClickEditLocation={openLocationEditModal}
                    onClickDeleteGroup={openDeleteModal}
                    onClickLeaveGroup={() => setIsLeaveModalOpen(true)}
                    onClickStartRecommendation={handleStartRecommendation}
                    onClickMoveActiveRecommendation={handleMoveActiveRecommendation}
                />
            </main>

            <GroupInviteModal
                isOpen={isInviteModalOpen}
                nickname={inviteNickname}
                isInviting={isInviting}
                message={inviteMessage}
                onClose={closeInviteModal}
                onChangeNickname={setInviteNickname}
                onClearMessage={clearInviteMessage}
                onInvite={handleInviteFriend}
            />

            <LocationModal
                isOpen={isLocationEditModalOpen}
                initialLocation={editingLocation}
                isSaving={isUpdatingLocation}
                onClose={closeLocationEditModal}
                onSave={handleUpdateLocation}
            />

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