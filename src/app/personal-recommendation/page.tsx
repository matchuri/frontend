"use client";

import { useState } from "react";
import { useAtomValue } from "jotai";

import { personalRecommendationPageStyles } from "@/ui/styles/personalRecommendationPageStyles";

import PersonalRecommendationHero from "@/features/personalRecommendation/ui/components/PersonalRecommendationHero";
import PersonalRecommendationLocationCard from "@/features/personalRecommendation/ui/components/PersonalRecommendationLocationCard";
import PersonalRecommendationPreferenceCard from "@/features/personalRecommendation/ui/components/PersonalRecommendationPreferenceCard";
import PersonalRecommendationHistoryPanel from "@/features/personalRecommendation/ui/components/PersonalRecommendationHistoryPanel";
import PersonalRecommendationStartAlertModal from "@/features/personalRecommendation/ui/components/PersonalRecommendationStartAlertModal";
import PersonalRecommendationLoadingView from "@/features/personalRecommendation/ui/components/PersonalRecommendationLoadingView";
import LocationModal from "@/features/locationSetting/ui/components/LocationModal";
import PreferenceModal from "@/features/preference/ui/components/PreferenceModal";

import AuthRequiredGuard from "@/features/routeGuard/ui/components/AuthRequiredGuard";

import { useLocationSetting } from "@/features/locationSetting/application/hooks/useLocationSetting";
import { usePreferenceList } from "@/features/preference/application/hooks/usePreferenceList";
import { usePersonalRecommendationStart } from "@/features/personalRecommendation/application/hooks/usePersonalRecommendationStart";
import { usePersonalRecommendationHistories } from "@/features/personalRecommendation/application/hooks/usePersonalRecommendationHistories";
import { usePersonalRecommendationResultNavigation } from "@/features/personalRecommendation/application/hooks/usePersonalRecommendationResultNavigation";

import { isPersonalRecommendationLoadingAtom } from "@/features/personalRecommendation/application/selectors/personalRecommendationSelectors";
import { hasRequiredPreference } from "@/features/preference/domain/validator/hasRequiredPreference";
import { personalRecommendationHistoryToPanelItemsMapper } from "@/features/personalRecommendation/ui/mapper/personalRecommendationHistoryToPanelItemsMapper";

import type { LocationSetting } from "@/features/locationSetting/domain/model/LocationSetting";

export default function PersonalRecommendationPage() {
    return (
        <AuthRequiredGuard>
            <PersonalRecommendationPageContent />
        </AuthRequiredGuard>
    );
}

function PersonalRecommendationPageContent() {
    const [isPreferenceModalOpen, setIsPreferenceModalOpen] = useState(false);
    const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

    // 서버에 저장된 개인 위치 조회 및 저장
    const {
        location,
        isLoading: isLocationLoading,
        isSaving: isLocationSaving,
        saveLocation,
    } = useLocationSetting();

    // 취향 프로필 조회
    const { preferenceState } = usePreferenceList();

    // 개인 추천 생성 및 재요청 중 로딩 화면 표시 여부
    const isRecommendationLoading = useAtomValue(
        isPersonalRecommendationLoadingAtom,
    );

    // 개인 추천 이력 조회
    const { histories } = usePersonalRecommendationHistories();

    // 이력 데이터를 화면 표시용 데이터로 변환
    const historyPanelItems =
        personalRecommendationHistoryToPanelItemsMapper(histories);

    // requestId 기반 추천 결과 페이지로 이동
    const { moveToRecommendationResult } =
        usePersonalRecommendationResultNavigation();

    // 선택 완료되지 않은 진행 중 추천 찾기
    const openRecommendation = histories.find(
        (history) => history.status === "OPEN",
    );

    // 필수 취향 정보가 모두 등록되어 있는지 확인
    const hasPreference =
        preferenceState.status === "SUCCESS" &&
        hasRequiredPreference(preferenceState.data);

    const {
        isAlertModalOpen,
        isCreating,
        startRecommendation,
        closeAlertModal,
    } = usePersonalRecommendationStart({
        location,
        hasPreference,
    });

    const handleClickHeroButton = () => {
        // 진행 중인 추천이 있으면 위치 조회 여부와 관계없이
        // 기존 추천 결과 화면으로 이동
        if (openRecommendation) {
            void moveToRecommendationResult(openRecommendation.id);
            return;
        }

        // 개인 위치 조회가 완료된 후 추천 시작 여부 판단
        if (isLocationLoading) {
            alert("위치 정보를 불러오는 중입니다.");
            return;
        }

        void startRecommendation();
    };

    const handleSaveLocation = async (
        nextLocation: LocationSetting,
    ) => {
        const isSaved = await saveLocation(nextLocation);

        if (isSaved) {
            setIsLocationModalOpen(false);
        }

        return isSaved;
    };

    if (isRecommendationLoading || isCreating) {
        return <PersonalRecommendationLoadingView />;
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
                                onStart={handleClickHeroButton}
                                isStarting={isCreating}
                                buttonLabel={
                                    openRecommendation
                                        ? "메뉴 추천 결과"
                                        : "메뉴 추천 시작하기"
                                }
                            />

                            <div className={personalRecommendationPageStyles.cardGrid}>
                                <PersonalRecommendationLocationCard
                                    address={
                                        isLocationLoading
                                            ? "위치 정보를 불러오는 중입니다."
                                            : location?.address ??
                                              "설정된 위치가 없습니다."
                                    }
                                    radiusMeters={
                                        isLocationLoading
                                            ? null
                                            : location?.radiusMeters ?? null
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
                            histories={historyPanelItems}
                            onClickDetail={moveToRecommendationResult}
                        />
                    </div>
                </div>
            </main>

            <LocationModal
                isOpen={isLocationModalOpen}
                onClose={() => {
                    if (!isLocationSaving) {
                        setIsLocationModalOpen(false);
                    }
                }}
                initialLocation={location}
                isSaving={isLocationSaving}
                onSave={handleSaveLocation}
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