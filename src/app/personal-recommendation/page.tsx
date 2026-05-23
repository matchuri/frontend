"use client";

import { useState } from "react";

import { personalRecommendationPageStyles } from "@/ui/styles/personalRecommendationPageStyles";

import PersonalRecommendationHero from "@/features/personalRecommendation/ui/components/PersonalRecommendationHero";
import PersonalRecommendationLocationCard from "@/features/personalRecommendation/ui/components/PersonalRecommendationLocationCard";
import PersonalRecommendationPreferenceCard from "@/features/personalRecommendation/ui/components/PersonalRecommendationPreferenceCard";
import PersonalRecommendationHistoryPanel from "@/features/personalRecommendation/ui/components/PersonalRecommendationHistoryPanel";
import LocationModal from "@/features/personalRecommendation/ui/components/LocationModal";
import PreferenceModal from "@/features/preference/ui/components/PreferenceModal";

import {
    personalRecommendationLocationMock,
    personalRecommendationHistoryMock,
} from "@/features/personalRecommendation/ui/config/personalRecommendationMockData";

export default function PersonalRecommendationPage() {
    const [isPreferenceModalOpen, setIsPreferenceModalOpen] = useState(false);
    const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

    return (
        <>
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
                                    address={personalRecommendationLocationMock.address
                                    }
                                    onClickEdit={() =>
                                        setIsLocationModalOpen(true)
                                    }
                                />

                                <PersonalRecommendationPreferenceCard
                                    onClickEdit={() =>
                                        setIsPreferenceModalOpen(true)
                                    }
                                />
                            </div>
                        </div>

                        <PersonalRecommendationHistoryPanel
                            histories={personalRecommendationHistoryMock}
                        />
                    </div>
                </div>
            </main>

            <LocationModal
                isOpen={isLocationModalOpen}
                onClose={() => setIsLocationModalOpen(false)}
                address={personalRecommendationLocationMock.address}
            />

            <PreferenceModal
                isOpen={isPreferenceModalOpen}
                onClose={() => setIsPreferenceModalOpen(false)}
            />
        </>
    );
}