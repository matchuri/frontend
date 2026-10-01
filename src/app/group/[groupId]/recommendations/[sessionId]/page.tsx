"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSetAtom, useAtomValue } from "jotai";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";

import type { GroupRecommendationReadinessUpdatedEvent } from "@/features/group/infrastructure/sse/dto/GroupRecommendationReadinessUpdatedEvent";
import type { GroupRecommendationOpenedEvent } from "@/features/group/infrastructure/sse/dto/GroupRecommendationOpenedEvent";

import { usePreferenceList } from "@/features/preference/application/hooks/usePreferenceList";
import { hasRequiredPreference } from "@/features/preference/domain/validator/hasRequiredPreference";
import {
    accessTokenAtom,
    memberAtom,
} from "@/features/auth/application/selectors/authSelectors";
import { groupRecommendationReadinessAtom } from "@/features/groupRecommendation/application/atoms/groupRecommendationReadinessAtom";
import { groupRecommendationSessionDetailAtom } from "@/features/groupRecommendation/application/atoms/groupRecommendationSessionDetailAtom";

import { useGroupDetail } from "@/features/group/application/hooks/useGroupDetail";
import { useGroupRecommendationSessionDetail } from "@/features/groupRecommendation/application/hooks/useGroupRecommendationSessionDetail";
import { useGroupRecommendationReadiness } from "@/features/groupRecommendation/application/hooks/useGroupRecommendationReadiness";
import { useCompleteGroupRecommendationPreparation } from "@/features/groupRecommendation/application/hooks/useCompleteGroupRecommendationPreparation";
import { useGroupRealtimeEvents } from "@/features/group/application/hooks/useGroupRealtimeEvents";

import {
    groupDetailAtomValue,
    isGroupDetailLoadingAtom,
    groupDetailErrorMessageAtom,
} from "@/features/group/application/selectors/groupDetailSelectors";
import {
    groupRecommendationSessionDetailAtomValue,
    isGroupRecommendationSessionDetailLoadingAtom,
    groupRecommendationSessionDetailErrorMessageAtom,
} from "@/features/groupRecommendation/application/selectors/groupRecommendationSessionDetailSelectors";

import {
    groupRecommendationReadinessAtomValue,
    isGroupRecommendationReadinessLoadingAtom,
    groupRecommendationReadinessErrorMessageAtom,
} from "@/features/groupRecommendation/application/selectors/groupRecommendationReadinessSelectors";

import PreferenceModal from "@/features/preference/ui/components/PreferenceModal";
import GroupRecommendationPreparationStatusCard from "@/features/groupRecommendation/ui/components/GroupRecommendationPreparationStatusCard";
import GroupRecommendationPreparationInfoCard from "@/features/groupRecommendation/ui/components/GroupRecommendationPreparationInfoCard";
import GroupRecommendationPreparationMemberCard from "@/features/groupRecommendation/ui/components/GroupRecommendationPreparationMemberCard";
import GroupRecommendationPreparationActions from "@/features/groupRecommendation/ui/components/GroupRecommendationPreparationActions";
import GroupRecommendationFlowSkeleton from "@/features/groupRecommendation/ui/components/GroupRecommendationFlowSkeleton";
import AuthRequiredGuard from "@/features/routeGuard/ui/components/AuthRequiredGuard";
import RecommendationLoadingView from "@/ui/components/RecommendationLoadingView";

import type { GroupDetail } from "@/features/group/domain/model/GroupDetail";

import { groupRecommendationPreparationPageStyles } from "@/ui/styles/groupRecommendationPreparationPageStyles";

const MIN_LOADING_TIME_MS = 2000;

export default function GroupRecommendationPreparationPage() {
    return (
        <AuthRequiredGuard>
            <GroupRecommendationPreparationPageContent />
        </AuthRequiredGuard>
    );
}

function GroupRecommendationPreparationPageContent() {
    const params = useParams<{
        groupId: string;
        sessionId: string;
    }>();

    const router = useRouter();

    const groupId = Number(params.groupId);
    const sessionId = Number(params.sessionId);

    const handleGroupNotFound = useCallback(() => {
        router.replace("/group");
    }, [router]);

    const { refetchGroupDetail } = useGroupDetail(groupId, {
        onGroupNotFound: handleGroupNotFound,
    });
    const { refetchSessionDetail } = useGroupRecommendationSessionDetail(
        groupId,
        sessionId,
    );
    const handleGroupMembersChanged = useCallback(() => {
        return refetchGroupDetail({ showLoading: false });
    }, [refetchGroupDetail]);
    const handleRecommendationOpened = useCallback(() => {
        return refetchSessionDetail({ showLoading: false });
    }, [refetchSessionDetail]);

    const groupDetail = useAtomValue(groupDetailAtomValue);
    const isGroupDetailLoading = useAtomValue(isGroupDetailLoadingAtom);
    const groupDetailErrorMessage = useAtomValue(groupDetailErrorMessageAtom);
    const sessionDetail = useAtomValue(groupRecommendationSessionDetailAtomValue);
    const isSessionDetailLoading = useAtomValue(isGroupRecommendationSessionDetailLoadingAtom);
    const sessionDetailErrorMessage = useAtomValue(groupRecommendationSessionDetailErrorMessageAtom);

    useEffect(() => {
        if (
            sessionDetail?.sessionId !== sessionId ||
            sessionDetail.status === "PREPARING"
        ) {
            return;
        }

        const timeoutId = window.setTimeout(() => {
            router.replace(`/group/${groupId}/recommendations/${sessionId}/result`);
        }, MIN_LOADING_TIME_MS);

        return () => {
            window.clearTimeout(timeoutId);
        };
    }, [groupId, router, sessionDetail, sessionId]);

    if (
        isGroupDetailLoading ||
        isSessionDetailLoading ||
        groupDetail?.id !== groupId ||
        sessionDetail?.sessionId !== sessionId
    ) {
        if (groupDetailErrorMessage || sessionDetailErrorMessage) {
            return (
                <main className={groupRecommendationPreparationPageStyles.stateContainer}>
                    <div className="flex flex-col items-center gap-4">
                        <p className={groupRecommendationPreparationPageStyles.errorText}>
                            {groupDetailErrorMessage ?? sessionDetailErrorMessage}
                        </p>
                        <button
                            type="button"
                            onClick={() => {
                                void refetchGroupDetail();
                                void refetchSessionDetail();
                            }}
                            className={groupRecommendationPreparationPageStyles.memberToggleButton}
                        >
                            다시 시도
                        </button>
                    </div>
                </main>
            );
        }

        return (
            <GroupRecommendationFlowSkeleton
                variant="PREPARATION"
                onClickBack={() => router.push(`/group/${groupId}`)}
            />
        );
    }

    if (sessionDetail.status !== "PREPARING") {
        return (
            <RecommendationLoadingView
                title="그룹 메뉴를 추천하고 있어요"
                description={
                    <>
                        그룹원들의 취향을 바탕으로
                        <br />
                        잘 어울리는 메뉴 3가지를 찾고 있어요.
                    </>
                }
                status="그룹 취향을 분석하는 중"
            />
        );
    }

    return (
        <GroupRecommendationPreparationContent
            key={`${groupId}-${sessionId}`}
            groupId={groupId}
            sessionId={sessionId}
            groupDetail={groupDetail}
            onGroupMembersChanged={handleGroupMembersChanged}
            onRecommendationOpened={handleRecommendationOpened}
        />
    );
}

interface GroupRecommendationPreparationContentProps {
    readonly groupId: number;
    readonly sessionId: number;
    readonly groupDetail: GroupDetail;
    readonly onGroupMembersChanged: () => Promise<void>;
    readonly onRecommendationOpened: () => Promise<void>;
}

function GroupRecommendationPreparationContent({
    groupId,
    sessionId,
    groupDetail,
    onGroupMembersChanged,
    onRecommendationOpened,
}: GroupRecommendationPreparationContentProps) {
    const router = useRouter();

    const [isPreferenceModalOpen, setIsPreferenceModalOpen] =
        useState(false);
    const [isMemberListExpanded, setIsMemberListExpanded] = useState(false);

    const handledReadinessUpdatedEventIds = useRef<Set<string>>(new Set());
    const handledRecommendationOpenedEventIds = useRef<Set<string>>(new Set());

    const accessToken = useAtomValue(accessTokenAtom);
    const member = useAtomValue(memberAtom);

    const setReadinessState = useSetAtom(groupRecommendationReadinessAtom);
    const setSessionDetailState = useSetAtom(groupRecommendationSessionDetailAtom);

    const { refetchReadiness } = useGroupRecommendationReadiness(
        groupId,
        sessionId,
    );

    const {
        isCompletingPreparation,
        completePreparation,
    } = useCompleteGroupRecommendationPreparation();

    const readiness = useAtomValue(groupRecommendationReadinessAtomValue);
    const isReadinessLoading = useAtomValue(
        isGroupRecommendationReadinessLoadingAtom,
    );
    const readinessErrorMessage = useAtomValue(
        groupRecommendationReadinessErrorMessageAtom,
    );

    const { preferenceState } = usePreferenceList();

    const hasPreference =
        preferenceState.status === "SUCCESS" &&
        hasRequiredPreference(preferenceState.data);

    const handleRecommendationReadinessUpdated = useCallback(
        (event: GroupRecommendationReadinessUpdatedEvent) => {
            if (handledReadinessUpdatedEventIds.current.has(event.eventId)) {
                return;
            }

            if (event.groupId !== groupId || event.sessionId !== sessionId) {
                return;
            }

            handledReadinessUpdatedEventIds.current.add(event.eventId);

            setReadinessState((prev) => {
                if (prev.status !== "SUCCESS") {
                    return prev;
                }

                return {
                    status: "SUCCESS",
                    data: {
                        ...prev.data,
                        status: event.payload.status,
                        progress: {
                            totalMemberCount:
                                event.payload.readinessProgress.totalMemberCount,
                            readyMemberCount:
                                event.payload.readinessProgress.readyMemberCount,
                            allReady:
                                event.payload.readinessProgress.allReady,
                        },
                        members: prev.data.members.map((readinessMember) =>
                            readinessMember.memberId ===
                            event.payload.readyMemberId
                                ? {
                                      ...readinessMember,
                                      ready: true,
                                  }
                                : readinessMember,
                        ),
                    },
                };
            });
        },
        [groupId, sessionId, setReadinessState],
    );

    const handleRecommendationOpened = useCallback(
        (event: GroupRecommendationOpenedEvent) => {
            if (handledRecommendationOpenedEventIds.current.has(event.eventId)) {
                return;
            }

            if (event.groupId !== groupId || event.sessionId !== sessionId) {
                return;
            }

            handledRecommendationOpenedEventIds.current.add(event.eventId);

            setReadinessState((prev) => {
                if (prev.status !== "SUCCESS") {
                    return prev;
                }

                return {
                    status: "SUCCESS",
                    data: {
                        ...prev.data,
                        status: event.payload.status,
                    },
                };
            });

            setSessionDetailState({
                status: "SUCCESS",
                data: {
                    sessionId: event.payload.sessionId,
                    status: event.payload.status,
                    locationSnapshot: null,
                    readiness: null,
                    candidates: event.payload.candidates.map(
                        (candidate, index) => ({
                            candidateId: candidate.candidateId,
                            menuId: candidate.menuItemId,
                            menuName: candidate.menuName,
                            rankNo: index + 1,
                            score: 0,
                            voteCount: 0,
                            thumbnailUrl: candidate.thumbnailUrl ?? null,
                        }),
                    ),
                    voteProgress: {
                        totalMemberCount:
                            event.payload.voteProgress.totalMemberCount,
                        votedMemberCount:
                            event.payload.voteProgress.votedMemberCount,
                        allReady: undefined,
                    },
                    memberVotes: [],
                    recommendationCategories: null,
                    finalCandidate: null,
                    createdAt: event.occurredAt,
                },
            });
        },
        [
            groupId,
            sessionId,
            setReadinessState,
            setSessionDetailState,
        ],
    );

    const handleGroupMembersChanged = useCallback(() => {
        void onGroupMembersChanged();
        void refetchReadiness({ showLoading: false });
    }, [onGroupMembersChanged, refetchReadiness]);

    useGroupRealtimeEvents({
        accessToken,
        groupId,
        onMemberJoined: handleGroupMembersChanged,
        onMemberLeft: handleGroupMembersChanged,
        onRecommendationReadinessUpdated:
            handleRecommendationReadinessUpdated,
        onRecommendationOpened: handleRecommendationOpened,
    });

    const handleClickEditPreference = () => {
        setIsPreferenceModalOpen(true);
    };

    const handleClickBack = () => {
        router.push(`/group/${groupId}`);
    };

    const handleClickCompletePreparation = async () => {
        if (!member) {
            alert("회원 정보를 불러오는 중입니다.");
            return;
        }

        if (!hasPreference) {
            alert("필수 취향 정보를 먼저 등록해주세요.");
            setIsPreferenceModalOpen(true);
            return;
        }

        try {
            const result = await completePreparation(
                groupId,
                sessionId,
                member.id,
            );

            if (result.status === "OPEN") {
                await onRecommendationOpened();
                return;
            }

            await refetchReadiness({
                showLoading: false,
            });
        } catch {
            alert("준비 완료 처리에 실패했습니다.");
        }
    };

    if (isReadinessLoading) {
        return (
            <GroupRecommendationFlowSkeleton
                variant="PREPARATION"
                onClickBack={handleClickBack}
            />
        );
    }

    if (readinessErrorMessage) {
        return (
            <main className={groupRecommendationPreparationPageStyles.stateContainer}>
                <p className={groupRecommendationPreparationPageStyles.errorText}>
                    {readinessErrorMessage}
                </p>
            </main>
        );
    }

    if (!readiness || readiness.sessionId !== sessionId) {
        return (
            <GroupRecommendationFlowSkeleton
                variant="PREPARATION"
                onClickBack={handleClickBack}
            />
        );
    }

    const groupMembersById = new Map(
        groupDetail.members
            .filter((groupMember) => groupMember.status === "ACTIVE")
            .map((groupMember) => [groupMember.memberId, groupMember] as const),
    );

    const sortedMembers = readiness.members.map((readinessMember) => {
        const groupMember = groupMembersById.get(readinessMember.memberId);

        return {
            ...readinessMember,
            nickname: groupMember?.nickname ?? readinessMember.nickname,
            profileImageUrl: groupMember?.memberProfileImageUrl ?? null,
            isMe: groupMember?.isMe ?? member?.id === readinessMember.memberId,
        };
    }).sort((a, b) => {
        const aIsMe = a.isMe;
        const bIsMe = b.isMe;

        if (aIsMe !== bIsMe) {
            return aIsMe ? -1 : 1;
        }

        if (a.ready !== b.ready) {
            return a.ready ? 1 : -1;
        }

        return 0;
    });

    const visibleMembers = isMemberListExpanded
        ? sortedMembers
        : sortedMembers.slice(0, 4);

    const hasMoreMembers = sortedMembers.length > 4;

    const isMeReady = sortedMembers.some(
        (readinessMember) =>
            readinessMember.isMe && readinessMember.ready,
    );

    const isPreparationComplete = isMeReady || readiness.status === "OPEN";

    return (
        <>
            <main className={groupRecommendationPreparationPageStyles.container}>
                <header className={groupRecommendationPreparationPageStyles.header}>
                    <button
                        type="button"
                        onClick={handleClickBack}
                        className={groupRecommendationPreparationPageStyles.backButton}
                        aria-label="그룹 상세 페이지로 돌아가기"
                    >
                        <ArrowLeft size={22} aria-hidden="true" />
                    </button>

                    <h1 className={groupRecommendationPreparationPageStyles.title}>
                        그룹 메뉴 추천
                    </h1>
                    <div className={groupRecommendationPreparationPageStyles.headerSpacer} aria-hidden="true" />
                </header>

                <div className={groupRecommendationPreparationPageStyles.content}>
                    <GroupRecommendationPreparationInfoCard
                        name={groupDetail.name}
                        address={groupDetail.location.address}
                        radiusMeters={groupDetail.location.radiusMeters}
                    />

                    <GroupRecommendationPreparationStatusCard
                        status={readiness.status}
                        totalMemberCount={readiness.progress.totalMemberCount}
                        readyMemberCount={readiness.progress.readyMemberCount}
                    />

                    <section className={groupRecommendationPreparationPageStyles.memberSection}>
                        <div className={groupRecommendationPreparationPageStyles.memberSectionHeader}>
                            <h2 className={groupRecommendationPreparationPageStyles.memberSectionTitle}>
                                그룹원
                            </h2>
                            <span className={groupRecommendationPreparationPageStyles.memberSectionCount}>
                                총 {readiness.progress.totalMemberCount}명
                            </span>
                        </div>

                        <div
                            id="group-recommendation-member-list"
                            className={groupRecommendationPreparationPageStyles.memberList}
                        >
                            {visibleMembers.map((readinessMember) => (
                                <GroupRecommendationPreparationMemberCard
                                    key={readinessMember.memberId}
                                    nickname={readinessMember.nickname}
                                    profileImageUrl={readinessMember.profileImageUrl}
                                    isMe={readinessMember.isMe}
                                    isReady={readinessMember.ready}
                                />
                            ))}
                        </div>

                        {hasMoreMembers && (
                            <button
                                type="button"
                                onClick={() => setIsMemberListExpanded((prev) => !prev)}
                                className={groupRecommendationPreparationPageStyles.memberToggleButton}
                                aria-expanded={isMemberListExpanded}
                                aria-controls="group-recommendation-member-list"
                            >
                                {isMemberListExpanded
                                    ? "접기"
                                    : `전체 보기 (${sortedMembers.length}명)`}

                                {isMemberListExpanded ? (
                                    <ChevronUp
                                        size={16}
                                        className={groupRecommendationPreparationPageStyles.memberToggleIcon}
                                        aria-hidden="true"
                                    />
                                ) : (
                                    <ChevronDown
                                        size={16}
                                        className={groupRecommendationPreparationPageStyles.memberToggleIcon}
                                        aria-hidden="true"
                                    />
                                )}
                            </button>
                        )}
                    </section>
                </div>

                <GroupRecommendationPreparationActions
                    isReady={isPreparationComplete}
                    isCompletingPreparation={isCompletingPreparation}
                    onClickEditPreference={handleClickEditPreference}
                    onClickCompletePreparation={handleClickCompletePreparation}
                />
            </main>

            <PreferenceModal
                isOpen={isPreferenceModalOpen}
                onClose={() => setIsPreferenceModalOpen(false)}
            />
        </>
    );
}