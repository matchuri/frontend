"use client";

import { personalRecommendationPageStyles } from "@/ui/styles/personalRecommendationPageStyles";
import PersonalRecommendationHero from "@/features/personalRecommendation/ui/components/PersonalRecommendationHero";
import PersonalRecommendationLocationCard from "@/features/personalRecommendation/ui/components/PersonalRecommendationLocationCard";
import PersonalRecommendationPreferenceCard from "@/features/personalRecommendation/ui/components/PersonalRecommendationPreferenceCard";
import PersonalRecommendationHistoryPanel from "@/features/personalRecommendation/ui/components/PersonalRecommendationHistoryPanel";
import {
    personalRecommendationLocationMock,
    personalRecommendationHistoryMock,
} from "@/features/personalRecommendation/ui/config/personalRecommendationMockData";

export default function PersonalRecommendationPage() {
    return (
        <main className={personalRecommendationPageStyles.container}>
            <div className={personalRecommendationPageStyles.content}>
                <header className={personalRecommendationPageStyles.header}>
                    <h1 className={personalRecommendationPageStyles.title}>
                        개인 메뉴 추천
                    </h1>
                    <p className={personalRecommendationPageStyles.description}>
                        당신의 맞춤형 메뉴를 탐색해보세요!
                    </p>
                </header>

                <div className={personalRecommendationPageStyles.layout}>
                    <div className={personalRecommendationPageStyles.mainColumn}>
                        <PersonalRecommendationHero />

                        <div className={personalRecommendationPageStyles.cardGrid}>
                            <PersonalRecommendationLocationCard
                                address={personalRecommendationLocationMock.address}
                            />

                            <PersonalRecommendationPreferenceCard />
                        </div>
                    </div>

                    <PersonalRecommendationHistoryPanel
                        histories={personalRecommendationHistoryMock}
                    />
                </div>
            </div>
        </main>
    );
}