"use client";

import { useCallback, useRef, useState } from "react";
import { useSetAtom, useAtomValue } from "jotai";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";

import type { GroupRecommendationReadinessUpdatedEvent } from "@/features/group/infrastructure/sse/dto/GroupRecommendationReadinessUpdatedEvent";
import type { GroupRecommendationOpenedEvent } from "@/features/group/infrastructure/sse/dto/GroupRecommendationOpenedEvent";

import { usePreferenceList } from "@/features/preference/application/hooks/usePreferenceList";
import { hasRequiredPreference } from "@/features/preference/domain/validator/hasRequiredPreference";
import { DEFAULT_LOCATION_RADIUS_METERS } from "@/features/locationSetting/domain/config/locationRadiusPolicy";
import {
    accessTokenAtom,
    memberAtom,
} from "@/features/auth/application/selectors/authSelectors";
import { groupRecommendationReadinessAtom } from "@/features/groupRecommendation/application/atoms/groupRecommendationReadinessAtom";
import { groupRecommendationSessionDetailAtom } from "@/features/groupRecommendation/application/atoms/groupRecommendationSessionDetailAtom";

import { useGroupRecommendationReadiness } from "@/features/groupRecommendation/application/hooks/useGroupRecommendationReadiness";
import { useCompleteGroupRecommendationPreparation } from "@/features/groupRecommendation/application/hooks/useCompleteGroupRecommendationPreparation";
import { useGroupRealtimeEvents } from "@/features/group/application/hooks/useGroupRealtimeEvents";

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
import AuthRequiredGuard from "@/features/routeGuard/ui/components/AuthRequiredGuard";

import { mockGroupRecommendationPreparation } from "@/features/groupRecommendation/ui/mock/mockGroupRecommendationPreparation";

import { groupRecommendationPreparationPageStyles } from "@/ui/styles/groupRecommendationPreparationPageStyles";

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

    const [isPreferenceModalOpen, setIsPreferenceModalOpen] =
        useState(false);
    const [isMemberListExpanded, setIsMemberListExpanded] = useState(false);

    const handledReadinessUpdatedEventIds = useRef<Set<string>>(new Set());
    const handledRecommendationOpenedEventIds = useRef<Set<string>>(new Set());

    // 방장이 준비 완료 API 응답으로 이미 결과 화면 이동을 예약한 경우,
    // GROUP_RECOMMENDATION_OPENED SSE에서 중복 router.push가 실행되지 않도록 막는 ref
    const isMovingToResultPageByAction = useRef(false);

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

    const groupRecommendation = mockGroupRecommendationPreparation;

    const hasPreference =
        preferenceState.status === "SUCCESS" &&
        hasRequiredPreference(preferenceState.data);

    const handleRecommendationReadinessUpdated = useCallback(
        (event: GroupRecommendationReadinessUpdatedEvent) => {
            if (handledReadinessUpdatedEventIds.current.has(event.eventId)) {
                return;
            }

            handledReadinessUpdatedEventIds.current.add(event.eventId);

            if (event.groupId !== groupId || event.sessionId !== sessionId) {
                return;
            }

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

            handledRecommendationOpenedEventIds.current.add(event.eventId);

            if (event.groupId !== groupId || event.sessionId !== sessionId) {
                return;
            }

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

            // 방장이 completePreparation 응답으로 이미 이동을 예약한 경우에는
            // SSE 이벤트에서 다시 router.push를 실행하지 않음
            if (isMovingToResultPageByAction.current) {
                return;
            }

            router.push(
                `/group/${event.groupId}/recommendations/${event.sessionId}/result`,
            );
        },
        [
            groupId,
            router,
            sessionId,
            setReadinessState,
            setSessionDetailState,
        ],
    );

    useGroupRealtimeEvents({
        accessToken,
        groupId,
        onRecommendationReadinessUpdated:
            handleRecommendationReadinessUpdated,
        onRecommendationOpened: handleRecommendationOpened,
    });

    const handleClickEditPreference = () => {
        setIsPreferenceModalOpen(true);
    };

    const moveToResultPage = () => {
        router.push(
            `/group/${groupId}/recommendations/${sessionId}/result`,
        );
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
                // 방장은 API 응답 기준으로 결과 화면 이동을 예약하므로,
                // 이후 도착하는 GROUP_RECOMMENDATION_OPENED SSE에서는 중복 이동하지 않도록 표시
                isMovingToResultPageByAction.current = true;

                window.setTimeout(() => {
                    moveToResultPage();
                }, 2500);

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
            <main className={groupRecommendationPreparationPageStyles.stateContainer}>
                <p className={groupRecommendationPreparationPageStyles.stateText}>
                    준비 상태를 불러오는 중...
                </p>
            </main>
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

    if (!readiness) {
        return null;
    }

    const sortedMembers = [...readiness.members].sort((a, b) => {
        const aIsMe = member?.id === a.memberId;
        const bIsMe = member?.id === b.memberId;

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
            readinessMember.memberId === member?.id && readinessMember.ready,
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
                        name={groupRecommendation.group.name}
                        address={groupRecommendation.group.address}
                        radiusMeters={DEFAULT_LOCATION_RADIUS_METERS}
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
                                    profileImageUrl={null}
                                    isMe={member?.id === readinessMember.memberId}
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