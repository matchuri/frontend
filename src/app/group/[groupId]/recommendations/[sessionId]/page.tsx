"use client";

import { useState } from "react";
import { useAtomValue } from "jotai";
import { useParams } from "next/navigation";

import PreferenceModal from "@/features/preference/ui/components/PreferenceModal";

import { usePreferenceList } from "@/features/preference/application/hooks/usePreferenceList";
import { hasRequiredPreference } from "@/features/preference/domain/validator/hasRequiredPreference";
import { memberAtom } from "@/features/auth/application/selectors/authSelectors";

import { useGroupRecommendationReadiness } from "@/features/groupRecommendation/application/hooks/useGroupRecommendationReadiness";
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

    const groupId = Number(params.groupId);
    const sessionId = Number(params.sessionId);

    const [isPreferenceModalOpen, setIsPreferenceModalOpen] = useState(false);

    const member = useAtomValue(memberAtom);

    useGroupRecommendationReadiness(groupId, sessionId);

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

    const handleClickEditPreference = () => {
        setIsPreferenceModalOpen(true);
    };

    const handleClickReady = () => {
        alert("준비 완료 API 연동 예정");
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

    // TODO: 현재는 그룹 메뉴 추천 페이지에서 멤버 카드 최대 4개만 표시. 나중에 바꿀 수도 있음
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
                                        member?.id === readinessMember.memberId;

                                    return (
                                        <GroupRecommendationPreparationMemberCard
                                            key={readinessMember.memberId}
                                            nickname={readinessMember.nickname}
                                            isMe={isMe}
                                            isReady={readinessMember.ready}
                                            hasPreference={
                                                isMe ? hasPreference : false
                                            }
                                            onClickEditPreference={
                                                isMe
                                                    ? handleClickEditPreference
                                                    : undefined
                                            }
                                            onClickReady={
                                                isMe
                                                    ? handleClickReady
                                                    : undefined
                                            }
                                        />
                                    );
                                })}
                            </div>
                        </section>

                        <GroupRecommendationPreparationInfoCard
                            name={groupRecommendation.group.name}
                            createdAt={groupRecommendation.group.createdAt}
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