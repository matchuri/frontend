"use client";

import { useCallback, useRef, useState } from "react";
import { useSetAtom, useAtomValue } from "jotai";
import { useParams, useRouter } from "next/navigation";

import PreferenceModal from "@/features/preference/ui/components/PreferenceModal";

import type { GroupRecommendationReadinessUpdatedEvent } from "@/features/group/infrastructure/sse/dto/GroupRecommendationReadinessUpdatedEvent";

import { usePreferenceList } from "@/features/preference/application/hooks/usePreferenceList";
import { hasRequiredPreference } from "@/features/preference/domain/validator/hasRequiredPreference";
import {
    accessTokenAtom,
    memberAtom,
} from "@/features/auth/application/selectors/authSelectors";
import { groupRecommendationReadinessAtom } from "@/features/groupRecommendation/application/atoms/groupRecommendationReadinessAtom";

import { useGroupRecommendationReadiness } from "@/features/groupRecommendation/application/hooks/useGroupRecommendationReadiness";
import { useCompleteGroupRecommendationPreparation } from "@/features/groupRecommendation/application/hooks/useCompleteGroupRecommendationPreparation";
import { useGroupRealtimeEvents } from "@/features/group/application/hooks/useGroupRealtimeEvents";

import {
    groupRecommendationReadinessAtomValue,
    isGroupRecommendationReadinessLoadingAtom,
    groupRecommendationReadinessErrorMessageAtom,
} from "@/features/groupRecommendation/application/selectors/groupRecommendationReadinessSelectors";

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

    const accessToken = useAtomValue(accessTokenAtom);
    const member = useAtomValue(memberAtom);

    const setReadinessState = useSetAtom(groupRecommendationReadinessAtom);

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

            if (event.groupId !== groupId ||event.sessionId !== sessionId) {
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

    useGroupRealtimeEvents({
        accessToken,
        groupId,
        onRecommendationReadinessUpdated:
            handleRecommendationReadinessUpdated,
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