"use client";

import { useState } from "react";
import { useAtomValue } from "jotai";

import { personalRecommendationPageStyles } from "@/ui/styles/personalRecommendationPageStyles";

import PersonalRecommendationHero from "@/features/personalRecommendation/ui/components/PersonalRecommendationHero";
import PersonalRecommendationLocationCard from "@/features/personalRecommendation/ui/components/PersonalRecommendationLocationCard";
import PersonalRecommendationPreferenceCard from "@/features/personalRecommendation/ui/components/PersonalRecommendationPreferenceCard";
import PersonalRecommendationHistoryPanel from "@/features/personalRecommendation/ui/components/PersonalRecommendationHistoryPanel";
import PersonalRecommendationStartAlertModal from "@/features/personalRecommendation/ui/components/PersonalRecommendationStartAlertModal";

import LocationModal from "@/features/locationSetting/ui/components/LocationModal";
import PreferenceModal from "@/features/preference/ui/components/PreferenceModal";

import { useLocationSetting } from "@/features/locationSetting/application/hooks/useLocationSetting";
import { createLocationStorageKey } from "@/features/locationSetting/application/utils/createLocationStorageKey";
import { usePreferenceList } from "@/features/preference/application/hooks/usePreferenceList";
import { usePersonalRecommendationStart } from "@/features/personalRecommendation/application/hooks/usePersonalRecommendationStart";
import { hasRequiredPreference } from "@/features/personalRecommendation/domain/validator/hasRequiredPreference";
import { memberAtom } from "@/features/auth/application/selectors/authSelectors";

import { personalRecommendationHistoryMock } from "@/features/personalRecommendation/ui/config/personalRecommendationMockData";

const PERSONAL_RECOMMENDATION_LOCATION_KEY = "personal-recommendation-location";

export default function PersonalRecommendationPage() {
    const [isPreferenceModalOpen, setIsPreferenceModalOpen] = useState(false);
    const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

    const member = useAtomValue(memberAtom);

    const locationStorageKey = createLocationStorageKey(
        PERSONAL_RECOMMENDATION_LOCATION_KEY,
        member?.id ?? "unknown",
    );

    const { location, saveLocation } = useLocationSetting(locationStorageKey);
    const { preferenceState } = usePreferenceList();

    const hasPreference =
        preferenceState.status === "SUCCESS" &&
        hasRequiredPreference(preferenceState.data);

    const {
        isAlertModalOpen,
        isCreating,
        startRecommendation,
        closeAlertModal
    } = usePersonalRecommendationStart({
        location,
        hasPreference,
    });

    if (!member) {
        return null;
    }

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
                            <PersonalRecommendationHero
                                onStart={startRecommendation}
                                isStarting={isCreating}
                            />

                            <div className={personalRecommendationPageStyles.cardGrid}>
                                <PersonalRecommendationLocationCard
                                    address={
                                        location?.address ??
                                        "설정된 위치가 없습니다."
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
                initialLocation={location}
                onSave={(nextLocation) => {
                    saveLocation(nextLocation);
                    setIsLocationModalOpen(false);
                }}
            />

            <PreferenceModal
                isOpen={isPreferenceModalOpen}
                onClose={() => setIsPreferenceModalOpen(false)}
            />

            <PersonalRecommendationStartAlertModal
                isOpen={isAlertModalOpen}
                onClose={closeAlertModal}
            />
        </>
    );
}