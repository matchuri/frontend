"use client";

import { useState } from "react";
import { useAtomValue } from "jotai";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { isLocationRadiusMeters } from "@/features/locationSetting/domain/config/locationRadiusPolicy";
import type { LocationSetting } from "@/features/locationSetting/domain/model/LocationSetting";
import LocationModal from "@/features/locationSetting/ui/components/LocationModal";
import { DEFAULT_MAP_LEVEL } from "@/features/map/domain/config/mapPolicy";

import { useGroupRecommendationSessionDetail } from "@/features/groupRecommendation/application/hooks/useGroupRecommendationSessionDetail";
import {
    groupRecommendationSessionDetailAtomValue,
    isGroupRecommendationSessionDetailLoadingAtom,
    groupRecommendationSessionDetailErrorMessageAtom,
} from "@/features/groupRecommendation/application/selectors/groupRecommendationSessionDetailSelectors";

import GroupRecommendationResultTasteSummary from "@/features/groupRecommendation/ui/components/GroupRecommendationResultTasteSummary";
import GroupRecommendationFlowSkeleton from "@/features/groupRecommendation/ui/components/GroupRecommendationFlowSkeleton";
import PersonalRecommendationSelectedRestaurantContent from "@/features/personalRecommendation/ui/components/PersonalRecommendationSelectedRestaurantContent";

import { groupRecommendationVoteResultPageStyles } from "@/ui/styles/groupRecommendationVoteResultPageStyles";

export default function GroupRecommendationVoteResultContent() {
    const params = useParams<{ groupId: string; sessionId: string }>();
    const router = useRouter();

    const groupId = Number(params.groupId);
    const sessionId = Number(params.sessionId);

    const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
    const [searchLocationOverride, setSearchLocationOverride] =
        useState<{ groupId: number; sessionId: number; location: LocationSetting } | null>(null);

    const { refetchSessionDetail } = useGroupRecommendationSessionDetail(groupId, sessionId);

    const sessionDetail = useAtomValue(groupRecommendationSessionDetailAtomValue);
    const isSessionDetailLoading = useAtomValue(isGroupRecommendationSessionDetailLoadingAtom);
    const sessionDetailErrorMessage = useAtomValue(groupRecommendationSessionDetailErrorMessageAtom);

    const handleClickBack = () => {
        router.push(`/group/${groupId}`);
    };

    const handleClickMoveVote = () => {
        router.push(`/group/${groupId}/recommendations/${sessionId}/result`);
    };

    const header = (
        <header className={groupRecommendationVoteResultPageStyles.header}>
            <button
                type="button"
                onClick={handleClickBack}
                className={groupRecommendationVoteResultPageStyles.backButton}
                aria-label="그룹 상세 페이지로 돌아가기"
            >
                <ArrowLeft size={22} aria-hidden="true" />
            </button>
            <h1 className={groupRecommendationVoteResultPageStyles.headerTitle}>
                투표 결과
            </h1>
            <div className={groupRecommendationVoteResultPageStyles.headerSpacer} aria-hidden="true" />
        </header>
    );

    if (sessionDetailErrorMessage) {
        return (
            <main className={groupRecommendationVoteResultPageStyles.container}>
                {header}
                <div className={groupRecommendationVoteResultPageStyles.stateContainer}>
                    <p className={groupRecommendationVoteResultPageStyles.errorText}>
                        {sessionDetailErrorMessage}
                    </p>
                    <button
                        type="button"
                        onClick={() => void refetchSessionDetail()}
                        className={groupRecommendationVoteResultPageStyles.retryButton}
                    >
                        다시 시도
                    </button>
                </div>
            </main>
        );
    }

    if (isSessionDetailLoading || sessionDetail?.sessionId !== sessionId) {
        return (
            <GroupRecommendationFlowSkeleton
                variant="VOTE_RESULT"
                onClickBack={handleClickBack}
            />
        );
    }

    if (sessionDetail.status !== "FINALIZED") {
        return (
            <main className={groupRecommendationVoteResultPageStyles.container}>
                {header}
                <div className={groupRecommendationVoteResultPageStyles.stateContainer}>
                    <p className={groupRecommendationVoteResultPageStyles.stateText}>
                        투표 종료 후 결과를 확인할 수 있어요.
                    </p>
                    <button
                        type="button"
                        onClick={handleClickMoveVote}
                        className={groupRecommendationVoteResultPageStyles.retryButton}
                    >
                        투표 화면으로 돌아가기
                    </button>
                </div>
            </main>
        );
    }

    const finalCandidate = sessionDetail.finalCandidate;
    const location = sessionDetail.locationSnapshot;
    const searchLocation = searchLocationOverride?.groupId === groupId && searchLocationOverride.sessionId === sessionId
        ? searchLocationOverride.location
        : location !== null
            ? { ...location, level: DEFAULT_MAP_LEVEL }
            : null;

    const handleSaveSearchLocation = async (nextLocation: LocationSetting): Promise<boolean> => {
        if (!isLocationRadiusMeters(nextLocation.radiusMeters)) return false;

        setSearchLocationOverride({ groupId, sessionId, location: nextLocation });
        setIsLocationModalOpen(false);
        return true;
    };

    if (!finalCandidate) {
        return (
            <main className={groupRecommendationVoteResultPageStyles.container}>
                {header}
                <div className={groupRecommendationVoteResultPageStyles.stateContainer}>
                    <p className={groupRecommendationVoteResultPageStyles.stateText}>
                        최종 선정 메뉴 정보를 확인할 수 없습니다.
                    </p>
                    <button
                        type="button"
                        onClick={() => void refetchSessionDetail()}
                        className={groupRecommendationVoteResultPageStyles.retryButton}
                    >
                        다시 시도
                    </button>
                </div>
            </main>
        );
    }

    const restaurantSearchKey = searchLocation !== null
        ? [
            sessionId,
            finalCandidate.candidateId,
            searchLocation.latitude,
            searchLocation.longitude,
            searchLocation.radiusMeters,
            searchLocation.address,
        ].join("-")
        : undefined;

    return (
        <>
            <main className={groupRecommendationVoteResultPageStyles.container}>
                {header}

                <div className={groupRecommendationVoteResultPageStyles.content}>
                    <GroupRecommendationResultTasteSummary
                        categories={sessionDetail.recommendationCategories}
                    />

                    {searchLocation === null && (
                        <div className={groupRecommendationVoteResultPageStyles.messageBox}>
                            추천 당시 위치 정보가 없어 주변 맛집을 조회할 수 없습니다.
                        </div>
                    )}

                    {searchLocation !== null && !isLocationRadiusMeters(searchLocation.radiusMeters) && (
                        <div className={groupRecommendationVoteResultPageStyles.errorBox}>
                            추천 당시 검색 반경을 지원하지 않아 주변 맛집을 조회할 수 없습니다.
                        </div>
                    )}

                    {searchLocation !== null && isLocationRadiusMeters(searchLocation.radiusMeters) && (
                        <PersonalRecommendationSelectedRestaurantContent
                            key={restaurantSearchKey}
                            menuName={finalCandidate.menuName}
                            location={searchLocation}
                            emptyStateAction={
                                <button
                                    type="button"
                                    onClick={() => setIsLocationModalOpen(true)}
                                    className={groupRecommendationVoteResultPageStyles.locationChangeButton}
                                >
                                    위치 변경하기
                                </button>
                            }
                        />
                    )}
                </div>
            </main>

            <LocationModal
                isOpen={isLocationModalOpen}
                initialLocation={searchLocation}
                onSave={handleSaveSearchLocation}
                onClose={() => setIsLocationModalOpen(false)}
            />
        </>
    );
}