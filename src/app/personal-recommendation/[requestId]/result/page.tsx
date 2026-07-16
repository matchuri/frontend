"use client";

import { useEffect } from "react";
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

import PersonalRecommendationResultContent from "@/features/personalRecommendation/ui/components/PersonalRecommendationResultContent";
import { personalRecommendationResultPageStyles } from "@/ui/styles/personalRecommendationResultPageStyles";

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

    const requestId =
        parsePersonalRecommendationRequestId(
            params.requestId,
        );

    // URL의 requestId를 기준으로 추천 상세 조회 실행
    usePersonalRecommendationDetail({
        requestId,
    });

    // 새로고침 또는 직접 접근 시 취향 정보 조회 실행
    usePreferenceList();

    // 추천 결과 화면에 필요한 개인 추천 상태
    const recommendation = useAtomValue(
        personalRecommendationResultAtom,
    );

    const isRecommendationLoading = useAtomValue(
        isPersonalRecommendationLoadingAtom,
    );

    const recommendationError = useAtomValue(
        personalRecommendationErrorAtom,
    );

    // 추천 결과 화면에 필요한 취향 상태
    const preference = useAtomValue(
        userPreferenceAtom,
    );

    const isPreferenceLoading = useAtomValue(
        isPreferenceLoadingAtom,
    );

    // 서버에 저장된 개인 위치 조회
    const {
        location,
        isLoading: isLocationLoading,
    } = useLocationSetting();

    // 추천 메뉴 선택 완료
    const { isCompleting, completeSelection } =
        useCompletePersonalRecommendationSelection();

    // 개인 메뉴 추천 재요청
    const { isRerolling, rerollRecommendation } =
        useRerollPersonalRecommendation();

    useEffect(() => {
        if (requestId !== null) {
            return;
        }

        alert("유효하지 않은 추천 결과 경로입니다.");
        router.replace("/personal-recommendation");
    }, [requestId, router]);

    useEffect(() => {
        if (recommendationError === null) {
            return;
        }

        alert(recommendationError);
        router.replace("/personal-recommendation");
    }, [recommendationError, router]);

    // 잘못된 경로는 redirect가 완료될 때까지 화면을 렌더링하지 않음
    if (requestId === null) {
        return null;
    }

    const isCurrentRecommendation =
        recommendation?.requestId === requestId;

    // 결과 데이터가 준비될 때까지 결과 페이지의 기본 영역을 유지
    if (
        isRecommendationLoading ||
        isPreferenceLoading ||
        !isCurrentRecommendation
    ) {
        return (
            <main
                className={personalRecommendationResultPageStyles.container}
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
        getPreferenceSummaryKeywords(preference);

    const handleCompleteSelection = async (
        selectedCandidateId: number,
    ) => {
        await completeSelection(
            recommendation.requestId,
            selectedCandidateId,
        );
    };

    const handleClickRestaurant = (candidateId: number) => {
        const candidate = recommendation.candidates.find(
            (item) => item.id === candidateId,
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

        const searchParams = new URLSearchParams({
            menuName: candidate.menuName,
            latitude: String(location.latitude),
            longitude: String(location.longitude),
            radiusMeters: String(location.radiusMeters),
            level: "4",
            source: "personal",
        });

        router.push(
            `/recommendation-restaurants?${searchParams.toString()}`,
        );
    };

    const handleRetryRecommendation = async () => {
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

    return (
        <PersonalRecommendationResultContent
            key={recommendation.requestId}
            recommendation={recommendation}
            keywords={keywords}
            isCompleting={isCompleting}
            isRerolling={isRerolling}
            onBack={() => router.push("/personal-recommendation")}
            onCompleteSelection={handleCompleteSelection}
            onRetryRecommendation={handleRetryRecommendation}
            onClickRestaurant={handleClickRestaurant}
        />
    );
}