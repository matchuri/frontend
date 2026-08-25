"use client";

import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { useParams, useRouter } from "next/navigation";

import { getPreferenceSummaryKeywords } from "@/features/preference/application/mapper/getPreferenceSummaryKeywords";
import { usePreferenceList } from "@/features/preference/application/hooks/usePreferenceList";
import {
    isPreferenceLoadingAtom,
    userPreferenceAtom,
} from "@/features/preference/application/selectors/preferenceSelectors";

import { useCompletePersonalRecommendationSelection } from "@/features/personalRecommendation/application/hooks/useCompletePersonalRecommendationSelection";
import { usePersonalRecommendationDetail } from "@/features/personalRecommendation/application/hooks/usePersonalRecommendationDetail";
import { useRerollPersonalRecommendation } from "@/features/personalRecommendation/application/hooks/useRerollPersonalRecommendation";
import { useLocationSetting } from "@/features/locationSetting/application/hooks/useLocationSetting";

import {
    isPersonalRecommendationLoadingAtom,
    personalRecommendationErrorAtom,
    personalRecommendationResultAtom,
} from "@/features/personalRecommendation/application/selectors/personalRecommendationSelectors";

import { parsePersonalRecommendationRequestId } from "@/features/personalRecommendation/application/usecase/parsePersonalRecommendationRequestId";
import { personalRecommendationSearchRadiusStorage } from "@/features/personalRecommendation/infrastructure/storage/personalRecommendationSearchRadiusStorage";

import PersonalRecommendationResultContent from "@/features/personalRecommendation/ui/components/PersonalRecommendationResultContent";
import { personalRecommendationResultPageStyles } from "@/ui/styles/personalRecommendationResultPageStyles";

import LocationModal from "@/features/locationSetting/ui/components/LocationModal";
import type { LocationSetting } from "@/features/locationSetting/domain/model/LocationSetting";

import AuthRequiredGuard from "@/features/routeGuard/ui/components/AuthRequiredGuard";

export default function PersonalRecommendationResultPage() {
    return (
        <AuthRequiredGuard>
            <PersonalRecommendationResultPageContent />
        </AuthRequiredGuard>
    );
}

function PersonalRecommendationResultPageContent() {
    const router = useRouter();
    const params = useParams<{ requestId: string }>();

    const [
        isLocationModalOpen,
        setIsLocationModalOpen,
    ] = useState(false);

    const requestId =
        parsePersonalRecommendationRequestId(
            params.requestId,
        );

    usePersonalRecommendationDetail({
        requestId,
    });

    usePreferenceList();

    const recommendation = useAtomValue(
        personalRecommendationResultAtom,
    );

    const isRecommendationLoading = useAtomValue(
        isPersonalRecommendationLoadingAtom,
    );

    const recommendationError = useAtomValue(
        personalRecommendationErrorAtom,
    );

    const preference = useAtomValue(
        userPreferenceAtom,
    );

    const isPreferenceLoading = useAtomValue(
        isPreferenceLoadingAtom,
    );

    const {
        location,
        isLoading: isLocationLoading,
        isSaving: isLocationSaving,
        saveLocation,
    } = useLocationSetting();

    const {
        isCompleting,
        completeSelection,
    } =
        useCompletePersonalRecommendationSelection();

    const {
        isRerolling,
        rerollRecommendation,
    } =
        useRerollPersonalRecommendation();

    useEffect(() => {
        if (requestId !== null) {
            return;
        }

        alert(
            "유효하지 않은 추천 결과 경로입니다.",
        );

        router.replace(
            "/personal-recommendation",
        );
    }, [requestId, router]);

    useEffect(() => {
        if (recommendationError === null) {
            return;
        }

        alert(recommendationError);

        router.replace(
            "/personal-recommendation",
        );
    }, [recommendationError, router]);

    if (requestId === null) {
        return null;
    }

    const isCurrentRecommendation =
        recommendation?.requestId === requestId;

    if (
        isRecommendationLoading ||
        isPreferenceLoading ||
        !isCurrentRecommendation
    ) {
        return (
            <main
                className={
                    personalRecommendationResultPageStyles.container
                }
            />
        );
    }

    if (
        recommendationError !== null ||
        recommendation === null
    ) {
        return null;
    }

    const keywords =
        getPreferenceSummaryKeywords(
            preference,
        );

    const isOpenRecommendation =
        recommendation.status === "OPEN";

    const resultLocation =
        isOpenRecommendation
            ? location
            : recommendation.locationSnapshot ?? null;

    const isResultLocationLoading =
        isOpenRecommendation &&
        isLocationLoading;

    const handleCompleteSelection = async (
        selectedCandidateId: number,
    ) => {
        if (isLocationLoading) {
            alert("위치 정보를 불러오는 중입니다.");
            return;
        }

        if (!location) {
            alert("설정된 위치가 없습니다. 위치를 설정해주세요.");
            return;
        }

        const effectiveRadiusMeters =
            personalRecommendationSearchRadiusStorage.get(
                recommendation.requestId,
                selectedCandidateId,
            ) ?? location.radiusMeters;

        const selectionLocation: LocationSetting = {
            ...location,
            radiusMeters:
                effectiveRadiusMeters,
        };

        const result = await completeSelection(
            recommendation.requestId,
            selectedCandidateId,
            selectionLocation,
        );

        if (!result) {
            return;
        }

        personalRecommendationSearchRadiusStorage.remove(
            recommendation.requestId,
            selectedCandidateId,
        );
    };

    const handleClickRestaurant = (
        candidateId: number,
    ) => {
        const candidate =
            recommendation.candidates.find(
                (item) => item.id === candidateId
            );

        if (!candidate) {
            return;
        }

        if (isLocationLoading) {
            alert("위치 정보를 불러오는 중입니다.");
            return;
        }

        if (!location) {
            alert("설정된 위치가 없습니다. 위치를 설정해주세요.");
            return;
        }

        const searchParams =
            new URLSearchParams({
                requestId: String(recommendation.requestId),
                candidateId: String(candidate.id),
                menuName: candidate.menuName,
                latitude: String(location.latitude),
                longitude: String(location.longitude),
                address: location.address,
                radiusMeters: String(location.radiusMeters),
                level: "4",
                source: "personal",
            });

        router.push(
            `/recommendation-restaurants?${searchParams.toString()}`,
        );
    };

    const handleRetryRecommendation =
        async () => {
            const nextRecommendation =
                await rerollRecommendation(
                    recommendation.requestId,
                    "NOT_SATISFIED",
                );

            if (!nextRecommendation) {
                return;
            }

            router.replace(
                `/personal-recommendation/${nextRecommendation.requestId}/result`,
            );
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

    return (
        <>
            <PersonalRecommendationResultContent
                key={recommendation.requestId}
                recommendation={recommendation}
                keywords={keywords}
                location={resultLocation}
                isLocationLoading={isResultLocationLoading}
                isCompleting={isCompleting}
                isRerolling={isRerolling}
                onBack={() =>
                    router.push("/personal-recommendation")
                }
                onCompleteSelection={handleCompleteSelection}
                onRetryRecommendation={handleRetryRecommendation}
                onClickRestaurant={handleClickRestaurant}
                onClickChangeLocation={() => setIsLocationModalOpen(true)}
            />

            <LocationModal
                isOpen={isLocationModalOpen}
                initialLocation={location}
                isSaving={isLocationSaving}
                onClose={() => setIsLocationModalOpen(false)}
                onSave={handleSaveLocation}
            />
        </>
    );
}