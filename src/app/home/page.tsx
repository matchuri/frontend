"use client";

import { useAtomValue } from "jotai";

import { useHomeGuard } from "@/features/routeGuard/application/hooks/useHomeGuard";
import { useHomeData } from "@/features/home/application/hooks/useHomeData";

import {
    homeDataAtom,
    homeErrorMessageAtom,
    isHomeLoadingAtom,
} from "@/features/home/application/selectors/homeSelectors";

import { useLocationSetting } from "@/features/locationSetting/application/hooks/useLocationSetting";
import { usePreferenceList } from "@/features/preference/application/hooks/usePreferenceList";
import { usePersonalRecommendationStart } from "@/features/personalRecommendation/application/hooks/usePersonalRecommendationStart";
import { usePersonalRecommendationResultNavigation } from "@/features/personalRecommendation/application/hooks/usePersonalRecommendationResultNavigation";

import { hasRequiredPreference } from "@/features/preference/domain/validator/hasRequiredPreference";

import HomeHeader from "@/features/home/ui/components/HomeHeader";
import HomeRecommendationHero from "@/features/home/ui/components/HomeRecommendationHero";
import HomeTasteProfileCard from "@/features/home/ui/components/HomeTasteProfileCard";
import HomeRecommendationHistory from "@/features/home/ui/components/HomeRecommendationHistory";
import HomeRecentGroupActivity from "@/features/home/ui/components/HomeRecentGroupActivity";

import PersonalRecommendationStartAlertModal from "@/features/personalRecommendation/ui/components/PersonalRecommendationStartAlertModal";
import PersonalRecommendationLoadingView from "@/features/personalRecommendation/ui/components/PersonalRecommendationLoadingView";

import { homeMemberPageStyles } from "@/ui/styles/homeMemberPageStyles";

export default function HomePage() {
    const { canAccess } = useHomeGuard();
    const { refetchHome } = useHomeData(canAccess);

    const homeData = useAtomValue(homeDataAtom);
    const isHomeLoading = useAtomValue(isHomeLoadingAtom);
    const homeErrorMessage = useAtomValue(homeErrorMessageAtom);

    const {
        location,
        isLoading: isLocationLoading,
    } = useLocationSetting();

    const { preferenceState } = usePreferenceList();
    const { moveToRecommendationResult } = usePersonalRecommendationResultNavigation();

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

    if (!canAccess) {
        return null;
    }

    if (isHomeLoading && !homeData) {
        return (
            <main className={homeMemberPageStyles.stateContainer}>
                <p className={homeMemberPageStyles.stateText}>
                    홈 정보를 불러오는 중입니다.
                </p>
            </main>
        );
    }

    if (homeErrorMessage && !homeData) {
        return (
            <main className={homeMemberPageStyles.stateContainer}>
                <p className={homeMemberPageStyles.errorText}>
                    {homeErrorMessage}
                </p>

                <button
                    type="button"
                    onClick={() => void refetchHome()}
                    className={homeMemberPageStyles.retryButton}
                >
                    다시 시도
                </button>
            </main>
        );
    }

    if (!homeData) {
        return null;
    }

    const latestRecommendation = homeData.personalRecommendation;

    const hasOpenRecommendation =
        latestRecommendation.latestRecommendationStatus === "OPEN" &&
        latestRecommendation.latestRecommendationId !== null;

    const handleClickRecommendationButton = () => {
        if (
            hasOpenRecommendation &&
            latestRecommendation.latestRecommendationId !== null
        ) {
            moveToRecommendationResult(
                latestRecommendation.latestRecommendationId,
            );
            return;
        }

        if (isLocationLoading) {
            alert("위치 정보를 불러오는 중입니다.");
            return;
        }

        void startRecommendation();
    };

    if (isCreating) {
        return <PersonalRecommendationLoadingView />;
    }

    return (
        <>
            <main className={homeMemberPageStyles.container}>
                <HomeHeader
                    nickname={homeData.user.nickname}
                    address={
                        homeData.location?.address ??
                        "설정된 위치가 없습니다."
                    }
                />

                <div className={homeMemberPageStyles.content}>
                    <HomeRecommendationHero
                        onStart={handleClickRecommendationButton}
                        isStarting={isCreating}
                        buttonLabel={
                            hasOpenRecommendation
                                ? "진행 중인 메뉴 추천 보기"
                                : "메뉴 추천 시작하기"
                        }
                    />

                    <HomeTasteProfileCard
                        attributes={homeData.tasteProfile.attributes}
                    />

                    <HomeRecommendationHistory
                        items={homeData.personalRecommendationHistory}
                    />

                    <HomeRecentGroupActivity
                        items={homeData.recentGroupActivities}
                    />
                </div>
            </main>

            <PersonalRecommendationStartAlertModal
                isOpen={isAlertModalOpen}
                onClose={closeAlertModal}
            />
        </>
    );
}