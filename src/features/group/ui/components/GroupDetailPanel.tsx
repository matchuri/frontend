"use client";

import Image from "next/image";
import { useState } from "react";
import { useAtomValue } from "jotai";
import {
    ArrowLeft,
    Check,
    Crown,
    MapPin,
    Pencil,
    Plus,
    UserRound,
    X,
} from "lucide-react";

import type { GroupDetail } from "@/features/group/domain/model/GroupDetail";
import { formatLocationRadius } from "@/features/locationSetting/domain/config/locationRadiusPolicy";

import { isGroupOwnerAtom } from "@/features/group/application/selectors/groupDetailSelectors";

import GroupDetailMoreButton from "@/features/group/ui/components/GroupDetailMoreButton";
import GroupRecommendationStartButton from "@/features/group/ui/components/GroupRecommendationStartButton";
import GroupMemberListModal from "@/features/group/ui/components/GroupMemberListModal";

import { groupDetailPanelStyles } from "@/ui/styles/groupDetailPanelStyles";

interface GroupDetailPanelProps {
    readonly group: GroupDetail;
    readonly isUpdatingGroupName: boolean;
    readonly groupNameUpdateMessage: string | null;
    readonly onClose: () => void;
    readonly onClickInvite: () => void;
    readonly onUpdateGroupName: (groupName: string) => Promise<void>;
    readonly onClickEditLocation: () => void;
    readonly onClickDeleteGroup: () => void;
    readonly onClickLeaveGroup: () => void;
    readonly onClickStartRecommendation: () => void;
    readonly onClickMoveActiveRecommendation: () => void;
}

export default function GroupDetailPanel({
    group,
    isUpdatingGroupName,
    groupNameUpdateMessage,
    onClose,
    onClickInvite,
    onUpdateGroupName,
    onClickEditLocation,
    onClickDeleteGroup,
    onClickLeaveGroup,
    onClickStartRecommendation,
    onClickMoveActiveRecommendation,
}: GroupDetailPanelProps) {
    const isOwner = useAtomValue(isGroupOwnerAtom);

    const [isEditingGroupName, setIsEditingGroupName] = useState(false);
    const [isMemberListModalOpen, setIsMemberListModalOpen] = useState(false);
    const [groupName, setGroupName] = useState(group.name);

    const recentlyRecommendation = group.recentlyRecommendation;

    const sortedMembers = [...group.members].sort((a, b) => {
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

    const visibleMembers = sortedMembers.slice(0, 4);

    const handleClickGroupNameEdit = () => {
        setGroupName(group.name);
        setIsEditingGroupName(true);
    };

    const handleCancelGroupNameEdit = () => {
        if (isUpdatingGroupName) {
            return;
        }

        setGroupName(group.name);
        setIsEditingGroupName(false);
    };

    const handleSaveGroupName = async () => {
        const trimmedGroupName = groupName.trim();

        if (isUpdatingGroupName) {
            return;
        }

        if (!trimmedGroupName) {
            return;
        }

        if (trimmedGroupName === group.name) {
            setIsEditingGroupName(false);
            return;
        }

        await onUpdateGroupName(trimmedGroupName);

        setIsEditingGroupName(false);
    };

    const renderRecommendationAction = () => {
        if (recentlyRecommendation?.status === "PREPARING") {
            return (
                <GroupRecommendationStartButton
                    label="진행중인 메뉴 추천 화면으로 이동"
                    variant="preparing"
                    onClick={onClickMoveActiveRecommendation}
                />
            );
        }

        if (recentlyRecommendation?.status === "OPEN") {
            return (
                <GroupRecommendationStartButton
                    label="투표 현황 확인"
                    variant="open"
                    onClick={onClickMoveActiveRecommendation}
                />
            );
        }

        if (isOwner) {
            return (
                <GroupRecommendationStartButton
                    onClick={onClickStartRecommendation}
                />
            );
        }

        return (
            <p className={groupDetailPanelStyles.recommendationGuideText}>
                방장이 추천을 시작하면 참여할 수 있어요.
            </p>
        );
    };

    return (
        <>
            <div className={groupDetailPanelStyles.panel}>
                <header className={groupDetailPanelStyles.header}>
                    <button
                        type="button"
                        onClick={onClose}
                        className={groupDetailPanelStyles.headerButton}
                        aria-label="그룹 목록으로 돌아가기"
                    >
                        <ArrowLeft
                            size={22}
                            aria-hidden="true"
                        />
                    </button>

                    <h1 className={groupDetailPanelStyles.headerTitle}>
                        그룹 상세
                    </h1>

                    <GroupDetailMoreButton
                        onClickEditLocation={onClickEditLocation}
                        onClickDeleteGroup={onClickDeleteGroup}
                        onClickLeaveGroup={onClickLeaveGroup}
                    />
                </header>

                <div className={groupDetailPanelStyles.content}>
                    <section className={groupDetailPanelStyles.groupSection}>
                        {isEditingGroupName ? (
                            <div className={groupDetailPanelStyles.groupNameEditWrapper}>
                                <div className={groupDetailPanelStyles.groupNameEditRow}>
                                    <input
                                        type="text"
                                        value={groupName}
                                        onChange={(event) => setGroupName(event.target.value)}
                                        onKeyDown={(event) => {
                                            if (event.key === "Enter") {
                                                void handleSaveGroupName();
                                            }

                                            if (event.key === "Escape") {
                                                handleCancelGroupNameEdit();
                                            }
                                        }}
                                        disabled={isUpdatingGroupName}
                                        className={groupDetailPanelStyles.groupNameInput}
                                        aria-label="그룹명"
                                        autoFocus
                                    />

                                    <button
                                        type="button"
                                        onClick={() => {void handleSaveGroupName();}}
                                        disabled={
                                            isUpdatingGroupName ||
                                            !groupName.trim() ||
                                            groupName.trim() === group.name
                                        }
                                        className={groupDetailPanelStyles.groupNameSaveButton}
                                        aria-label="그룹명 변경 저장"
                                    >
                                        <Check
                                            size={16}
                                            strokeWidth={2.5}
                                            aria-hidden="true"
                                        />
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleCancelGroupNameEdit}
                                        disabled={isUpdatingGroupName}
                                        className={groupDetailPanelStyles.groupNameCancelButton}
                                        aria-label="그룹명 변경 취소"
                                    >
                                        <X
                                            size={16}
                                            strokeWidth={2.5}
                                            aria-hidden="true"
                                        />
                                    </button>
                                </div>

                                {groupNameUpdateMessage && (
                                    <p className={groupDetailPanelStyles.groupNameErrorMessage}>
                                        {groupNameUpdateMessage}
                                    </p>
                                )}
                            </div>
                        ) : (
                            <div className={groupDetailPanelStyles.groupNameRow}>
                                <h2 className={groupDetailPanelStyles.groupTitle}>
                                    {group.name}
                                </h2>

                                {isOwner && (
                                    <button
                                        type="button"
                                        onClick={handleClickGroupNameEdit}
                                        className={groupDetailPanelStyles.groupNameEditButton}
                                        aria-label="그룹명 수정"
                                    >
                                        <Pencil
                                            size={16}
                                            aria-hidden="true"
                                        />
                                    </button>
                                )}
                            </div>
                        )}

                        {group.location.address && (
                            <div className={groupDetailPanelStyles.locationInfo}>
                                <MapPin
                                    size={15}
                                    strokeWidth={2}
                                    aria-hidden="true"
                                />

                                <span className={groupDetailPanelStyles.address}>
                                    {group.location.address}
                                </span>

                                <span
                                    className={groupDetailPanelStyles.locationDivider}
                                    aria-hidden="true"
                                >
                                    ·
                                </span>

                                <span className={groupDetailPanelStyles.locationRadius}>
                                    {formatLocationRadius(group.location.radiusMeters)}
                                </span>
                            </div>
                        )}
                    </section>

                    <section className={groupDetailPanelStyles.recommendationSection}>
                        {renderRecommendationAction()}
                    </section>

                    <section className={groupDetailPanelStyles.memberSection}>
                        <div className={groupDetailPanelStyles.memberSectionHeader}>
                            <div className={groupDetailPanelStyles.memberTitleRow}>
                                <h3 className={groupDetailPanelStyles.sectionTitle}>
                                    참여 그룹원
                                </h3>

                                <span className={groupDetailPanelStyles.memberCount}>
                                    {group.members.length}명
                                </span>
                            </div>

                            <button
                                type="button"
                                onClick={() => setIsMemberListModalOpen(true)}
                                className={groupDetailPanelStyles.memberViewAllButton}
                            >
                                모두 보기
                            </button>
                        </div>

                        <div className={groupDetailPanelStyles.memberPreviewList}>
                            {visibleMembers.map((member) => (
                                <div
                                    key={member.memberId}
                                    className={groupDetailPanelStyles.memberPreviewItem}
                                >
                                    <div className={groupDetailPanelStyles.memberPreviewAvatar}>
                                        {member.memberProfileImageUrl ? (
                                            <Image
                                                src={member.memberProfileImageUrl}
                                                alt={`${member.nickname} 프로필`}
                                                fill
                                                sizes="56px"
                                                className={groupDetailPanelStyles.memberPreviewImage}
                                            />
                                        ) : (
                                            <UserRound
                                                size={24}
                                                strokeWidth={1.8}
                                                aria-hidden="true"
                                            />
                                        )}

                                        {member.role === "OWNER" && (
                                            <span className={groupDetailPanelStyles.memberOwnerIndicator}>
                                                <Crown
                                                    size={10}
                                                    strokeWidth={2.2}
                                                    aria-hidden="true"
                                                />
                                            </span>
                                        )}
                                    </div>

                                    <span className={groupDetailPanelStyles.memberPreviewNickname}>
                                        {member.nickname}
                                        {member.isMe && " (나)"}
                                    </span>
                                </div>
                            ))}

                            {isOwner && (
                                <button
                                    type="button"
                                    onClick={onClickInvite}
                                    className={groupDetailPanelStyles.memberInviteItem}
                                    aria-label="그룹원 초대"
                                >
                                    <span className={groupDetailPanelStyles.memberInviteCircle}>
                                        <Plus
                                            size={26}
                                            strokeWidth={1.8}
                                            aria-hidden="true"
                                        />
                                    </span>

                                    <span className={groupDetailPanelStyles.memberInviteLabel}>
                                        초대
                                    </span>
                                </button>
                            )}
                        </div>
                    </section>
                </div>
            </div>

            <GroupMemberListModal
                isOpen={isMemberListModalOpen}
                members={group.members}
                onClose={() => setIsMemberListModalOpen(false)}
            />
        </>
    );
}