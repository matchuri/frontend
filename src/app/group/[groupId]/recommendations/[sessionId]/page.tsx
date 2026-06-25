"use client";

import { useState } from "react";

import PreferenceModal from "@/features/preference/ui/components/PreferenceModal";

import { usePreferenceList } from "@/features/preference/application/hooks/usePreferenceList";
import { hasRequiredPreference } from "@/features/preference/domain/validator/hasRequiredPreference";

import GroupRecommendationPreparationStatusCard from "@/features/groupRecommendation/ui/components/GroupRecommendationPreparationStatusCard";
import GroupRecommendationPreparationInfoCard from "@/features/groupRecommendation/ui/components/GroupRecommendationPreparationInfoCard";
import GroupRecommendationPreparationMemberCard from "@/features/groupRecommendation/ui/components/GroupRecommendationPreparationMemberCard";

import { mockGroupRecommendationPreparation } from "@/features/groupRecommendation/ui/mock/mockGroupRecommendationPreparation";

import { groupRecommendationPreparationPageStyles } from "@/ui/styles/groupRecommendationPreparationPageStyles";

export default function GroupRecommendationPreparationPage() {
    const [isPreferenceModalOpen, setIsPreferenceModalOpen] = useState(false);

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
                                    groupRecommendation.readiness.totalMemberCount
                                }
                                readyMemberCount={
                                    groupRecommendation.readiness.readyMemberCount
                                }
                            />

                            <div className={groupRecommendationPreparationPageStyles.memberGrid}>
                                {groupRecommendation.members.map((member) => (
                                    <GroupRecommendationPreparationMemberCard
                                        key={member.memberId}
                                        nickname={member.nickname}
                                        isMe={member.isMe}
                                        isReady={member.isReady}
                                        hasPreference={
                                            member.isMe ? hasPreference : false
                                        }
                                        onClickEditPreference={
                                            member.isMe
                                                ? handleClickEditPreference
                                                : undefined
                                        }
                                        onClickReady={
                                            member.isMe
                                                ? handleClickReady
                                                : undefined
                                        }
                                    />
                                ))}
                            </div>
                        </section>

                        <GroupRecommendationPreparationInfoCard
                            name={groupRecommendation.group.name}
                            createdAt={groupRecommendation.group.createdAt}
                            address={groupRecommendation.group.address}
                            memberCount={groupRecommendation.group.memberCount}
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