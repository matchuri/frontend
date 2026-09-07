"use client";

import {
    useCallback,
    useState,
} from "react";
import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";

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

import { useRespondGroupInvite } from "@/features/group/application/hooks/useRespondGroupInvite";
import { useMyRealtimeEvents } from "@/features/group/application/hooks/useMyRealtimeEvents";
import { useGroupInviteExists } from "@/features/groupInviteNotification/application/hooks/useGroupInviteExists";
import { useGroupInviteNotifications } from "@/features/groupInviteNotification/application/hooks/useGroupInviteNotifications";

import { accessTokenAtom } from "@/features/auth/application/selectors/authSelectors";

import { hasRequiredPreference } from "@/features/preference/domain/validator/hasRequiredPreference";

import HomeHeader from "@/features/home/ui/components/HomeHeader";
import HomeRecommendationHero from "@/features/home/ui/components/HomeRecommendationHero";
import HomeTasteProfileCard from "@/features/home/ui/components/HomeTasteProfileCard";
import HomeRecommendationHistory from "@/features/home/ui/components/HomeRecommendationHistory";
import HomeRecentGroupActivity from "@/features/home/ui/components/HomeRecentGroupActivity";

import GroupInviteNotification from "@/features/groupInviteNotification/ui/components/GroupInviteNotification";
import GroupInviteNotificationButton from "@/features/groupInviteNotification/ui/components/GroupInviteNotificationButton";

import PersonalRecommendationStartAlertModal from "@/features/personalRecommendation/ui/components/PersonalRecommendationStartAlertModal";
import PersonalRecommendationLoadingView from "@/features/personalRecommendation/ui/components/PersonalRecommendationLoadingView";
import LocationModal from "@/features/locationSetting/ui/components/LocationModal";
import PreferenceModal from "@/features/preference/ui/components/PreferenceModal";

import type { LocationSetting } from "@/features/locationSetting/domain/model/LocationSetting";

import { homeMemberPageStyles } from "@/ui/styles/homeMemberPageStyles";

export default function HomePage() {
    const router = useRouter();

    const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
    const [isPreferenceModalOpen, setIsPreferenceModalOpen] = useState(false);
    const [isInviteNotificationOpen, setIsInviteNotificationOpen] = useState(false);

    const { canAccess } = useHomeGuard();
    const { refetchHome } = useHomeData(canAccess);

    const homeData = useAtomValue(homeDataAtom);
    const isHomeLoading = useAtomValue(isHomeLoadingAtom);
    const homeErrorMessage = useAtomValue(homeErrorMessageAtom);

    const accessToken = useAtomValue(accessTokenAtom);

    const {
        hasInvite,
        refetchInviteExists,
    } = useGroupInviteExists();

    const {
        invites,
        refetchInvites,
    } = useGroupInviteNotifications();

    const handleGroupInviteCreated =
        useCallback(() => {
            void refetchInvites();
            void refetchInviteExists();
        }, [
            refetchInvites,
            refetchInviteExists,
        ]);

    useMyRealtimeEvents({
        accessToken,
        onGroupInviteCreated: handleGroupInviteCreated,
    });

    const { processingInviteId, respond } = useRespondGroupInvite({
        onSuccess: () => {
            void refetchInvites();
            void refetchInviteExists();
            void refetchHome();
        },
    });

    const {
        location,
        isLoading: isLocationLoading,
        isSaving: isLocationSaving,
        saveLocation,
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

    const handleClickLocation = () => {
        if (isLocationLoading) {
            alert("위치 정보를 불러오는 중입니다.");
            return;
        }

        setIsLocationModalOpen(true);
    };

    const handleSaveLocation = async (
        nextLocation: LocationSetting,
    ) => {
        const isSaved = await saveLocation(nextLocation);

        if (!isSaved) {
            return false;
        }

        await refetchHome();

        setIsLocationModalOpen(false);

        return true;
    };

    const handleClickPreferenceEdit = () => {
        setIsPreferenceModalOpen(true);
    };

    const handlePreferenceSaved = () => {
        void refetchHome();

        setIsPreferenceModalOpen(false);
    };

    const handleClickNotification = () => {
        setIsInviteNotificationOpen((prev) => !prev);
    };

    const handleAcceptInvite = (inviteId: number) => {
        if (processingInviteId !== null) {
            return;
        }

        void respond(inviteId, "ACCEPT");
    };

    const handleDeclineInvite = (inviteId: number) => {
        if (processingInviteId !== null) {
            return;
        }

        void respond(inviteId, "DECLINE");
    };

    const handleClickRecommendationHistoryViewAll = () => {
        router.push("/home/personal-recommendation-history");
    };

    const handleClickGroupActivity = (groupId: number) => {
        router.push(`/group?selectedGroupId=${groupId}`);
    };

    const handleClickGroupActivityViewAll = () => {
        router.push("/home/recent-group-activities");
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
                    onClickLocation={handleClickLocation}
                />

                <GroupInviteNotificationButton
                    hasInvites={hasInvite}
                    isOpen={isInviteNotificationOpen}
                    onClick={handleClickNotification}
                />

                {isInviteNotificationOpen && (
                    <GroupInviteNotification
                        invites={invites}
                        processingInviteId={processingInviteId}
                        onAcceptInvite={handleAcceptInvite}
                        onDeclineInvite={handleDeclineInvite}
                        onClose={() =>
                            setIsInviteNotificationOpen(false)
                        }
                    />
                )}

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
                        onClickEdit={handleClickPreferenceEdit}
                    />

                    <HomeRecommendationHistory
                        items={homeData.personalRecommendationHistory}
                        onClickDetail={moveToRecommendationResult}
                        onClickViewAll={handleClickRecommendationHistoryViewAll}
                    />

                    <HomeRecentGroupActivity
                        items={homeData.recentGroupActivities}
                        onClickGroup={handleClickGroupActivity}
                        onClickViewAll={handleClickGroupActivityViewAll}
                    />
                </div>
            </main>

            <LocationModal
                isOpen={isLocationModalOpen}
                initialLocation={location}
                isSaving={isLocationSaving}
                onClose={() => {
                    if (!isLocationSaving) {
                        setIsLocationModalOpen(false);
                    }
                }}
                onSave={handleSaveLocation}
            />

            <PreferenceModal
                isOpen={isPreferenceModalOpen}
                onClose={() => setIsPreferenceModalOpen(false)}
                onSaved={handlePreferenceSaved}
            />

            <PersonalRecommendationStartAlertModal
                isOpen={isAlertModalOpen}
                onClose={closeAlertModal}
            />
        </>
    );
}