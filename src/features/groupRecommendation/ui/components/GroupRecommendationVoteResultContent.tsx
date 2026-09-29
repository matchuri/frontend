"use client";

import { useAtomValue } from "jotai";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, MapPin, Store } from "lucide-react";

import { useGroupRecommendationSessionDetail } from "@/features/groupRecommendation/application/hooks/useGroupRecommendationSessionDetail";
import {
    groupRecommendationSessionDetailAtomValue,
    isGroupRecommendationSessionDetailLoadingAtom,
    groupRecommendationSessionDetailErrorMessageAtom,
} from "@/features/groupRecommendation/application/selectors/groupRecommendationSessionDetailSelectors";

import GroupRecommendationResultTasteSummary from "@/features/groupRecommendation/ui/components/GroupRecommendationResultTasteSummary";

import { groupRecommendationVoteResultPageStyles } from "@/ui/styles/groupRecommendationVoteResultPageStyles";

export default function GroupRecommendationVoteResultContent() {
    const params = useParams<{ groupId: string; sessionId: string }>();
    const router = useRouter();

    const groupId = Number(params.groupId);
    const sessionId = Number(params.sessionId);

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
            <main className={groupRecommendationVoteResultPageStyles.container}>
                {header}
                <div className={groupRecommendationVoteResultPageStyles.stateContainer}>
                    <p className={groupRecommendationVoteResultPageStyles.stateText}>
                        투표 결과를 불러오는 중...
                    </p>
                </div>
            </main>
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

    const radiusLabel = location
        ? location.radiusMeters >= 1000
            ? `${location.radiusMeters / 1000}km`
            : `${location.radiusMeters}m`
        : null;

    return (
        <main className={groupRecommendationVoteResultPageStyles.container}>
            {header}

            <div className={groupRecommendationVoteResultPageStyles.content}>
                <GroupRecommendationResultTasteSummary
                    categories={sessionDetail.recommendationCategories}
                />

                <section className={groupRecommendationVoteResultPageStyles.restaurantSection}>
                    <div className={groupRecommendationVoteResultPageStyles.restaurantHeader}>
                        <h2 className={groupRecommendationVoteResultPageStyles.restaurantTitle}>
                            {finalCandidate.menuName} 주변 맛집
                        </h2>
                        <div className={groupRecommendationVoteResultPageStyles.restaurantLocationRow}>
                            <p className={groupRecommendationVoteResultPageStyles.restaurantDescription}>
                                <MapPin size={14} className="shrink-0" aria-hidden="true" />
                                <span className="truncate">
                                    {location?.address ?? "추천 당시 위치 정보가 없습니다."}
                                </span>
                            </p>
                            <span className={groupRecommendationVoteResultPageStyles.restaurantRadius}>
                                {radiusLabel ? `검색 반경 ${radiusLabel}` : "반경 정보 없음"}
                            </span>
                        </div>
                    </div>

                    <div className={groupRecommendationVoteResultPageStyles.restaurantLayout}>
                        <div
                            className={groupRecommendationVoteResultPageStyles.restaurantMapPlaceholder}
                            aria-label="주변 맛집 지도 표시 영역"
                        >
                            <div className={groupRecommendationVoteResultPageStyles.placeholderIcon}>
                                <MapPin size={25} strokeWidth={1.8} aria-hidden="true" />
                            </div>
                            <p className={groupRecommendationVoteResultPageStyles.placeholderTitle}>
                                지도 연동 예정
                            </p>
                            <p className={groupRecommendationVoteResultPageStyles.placeholderDescription}>
                                추천 당시 위치를 기준으로 지도가 표시될 영역입니다.
                            </p>
                        </div>

                        <div className={groupRecommendationVoteResultPageStyles.restaurantList}>
                            <div className={groupRecommendationVoteResultPageStyles.restaurantEmpty}>
                                <Store size={24} strokeWidth={1.8} aria-hidden="true" />
                                <p className={groupRecommendationVoteResultPageStyles.placeholderTitle}>
                                    주변 맛집 목록
                                </p>
                                <p className={groupRecommendationVoteResultPageStyles.placeholderDescription}>
                                    맛집 검색 기능 연동 후 결과가 표시될 영역입니다.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}