"use client";

import { useCallback, useRef, useState } from "react";
import { useSetAtom, useAtomValue } from "jotai";
import { useParams, useRouter } from "next/navigation";

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

import { mockGroupRecommendationPreparation } from "@/features/groupRecommendation/ui/mock/mockGroupRecommendationPreparation";

import { groupRecommendationPreparationPageStyles } from "@/ui/styles/groupRecommendationPreparationPageStyles";

export default function GroupRecommendationPreparationPage() {
    const params = useParams<{
        groupId: string;
        sessionId: string;
    }>();

    const router = useRouter();

    const groupId = Number(params.groupId);
    const sessionId = Number(params.sessionId);

    const [isPreferenceModalOpen, setIsPreferenceModalOpen] =
        useState(false);

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
            <main className={groupRecommendationPreparationPageStyles.container}>
                <div className={groupRecommendationPreparationPageStyles.content}>
                    준비 상태를 불러오는 중...
                </div>
            </main>
        );
    }

    if (readinessErrorMessage) {
        return (
            <main className={groupRecommendationPreparationPageStyles.container}>
                <div className={groupRecommendationPreparationPageStyles.content}>
                    {readinessErrorMessage}
                </div>
            </main>
        );
    }

    if (!readiness) {
        return null;
    }

    const sortedMembers = [...readiness.members].sort((a, b) => {
        if (member?.id === a.memberId) {
            return -1;
        }

        if (member?.id === b.memberId) {
            return 1;
        }

        return 0;
    });

    const visibleMembers = sortedMembers.slice(0, 4);

    return (
        <>
            <main className={groupRecommendationPreparationPageStyles.container}>
                <div className={groupRecommendationPreparationPageStyles.content}>
                    <h1 className={groupRecommendationPreparationPageStyles.title}>
                        그룹 메뉴 추천
                    </h1>

                    <div className={groupRecommendationPreparationPageStyles.layout}>
                        <section className={groupRecommendationPreparationPageStyles.mainSection}>
                            <GroupRecommendationPreparationStatusCard
                                status={readiness.status}
                                totalMemberCount={
                                    readiness.progress.totalMemberCount
                                }
                                readyMemberCount={
                                    readiness.progress.readyMemberCount
                                }
                            />

                            <div className={groupRecommendationPreparationPageStyles.memberGrid}>
                                {visibleMembers.map((readinessMember) => {
                                    const isMe =
                                        member?.id ===
                                        readinessMember.memberId;

                                    return (
                                        <GroupRecommendationPreparationMemberCard
                                            key={readinessMember.memberId}
                                            nickname={
                                                readinessMember.nickname
                                            }
                                            isMe={isMe}
                                            isReady={readinessMember.ready}
                                            hasPreference={
                                                isMe
                                                    ? hasPreference
                                                    : false
                                            }
                                            isCompletingPreparation={
                                                isMe
                                                    ? isCompletingPreparation
                                                    : false
                                            }
                                            onClickEditPreference={
                                                isMe
                                                    ? handleClickEditPreference
                                                    : undefined
                                            }
                                            onClickCompletePreparation={
                                                isMe
                                                    ? handleClickCompletePreparation
                                                    : undefined
                                            }
                                        />
                                    );
                                })}
                            </div>
                        </section>

                        <GroupRecommendationPreparationInfoCard
                            name={groupRecommendation.group.name}
                            createdAt={
                                groupRecommendation.group.createdAt
                            }
                            address={groupRecommendation.group.address}
                            memberCount={
                                readiness.progress.totalMemberCount
                            }
                        />
                    </div>
                </div>
            </main>

            <PreferenceModal
                isOpen={isPreferenceModalOpen}
                onClose={() => setIsPreferenceModalOpen(false)}
            />
        </>
    );
}