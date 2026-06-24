"use client";

import GroupRecommendationPreparationStatusCard from "@/features/groupRecommendation/ui/components/GroupRecommendationPreparationStatusCard";
import GroupRecommendationPreparationInfoCard from "@/features/groupRecommendation/ui/components/GroupRecommendationPreparationInfoCard";
import GroupRecommendationPreparationMemberCard from "@/features/groupRecommendation/ui/components/GroupRecommendationPreparationMemberCard";

import { mockGroupRecommendationPreparation } from "@/features/groupRecommendation/ui/mock/mockGroupRecommendationPreparation";

import { groupRecommendationPreparationPageStyles } from "@/ui/styles/groupRecommendationPreparationPageStyles";

export default function GroupRecommendationPage() {
    const groupRecommendation = mockGroupRecommendationPreparation;

    const handleClickEditPreference = () => {
        alert("취향 수정 모달 연결 예정");
    };

    const handleClickReady = () => {
        alert("준비 완료 API 연동 예정");
    };

    return (
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
                                    onClickEditPreference={handleClickEditPreference}
                                    onClickReady={handleClickReady}
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
    );
}