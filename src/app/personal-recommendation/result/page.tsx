"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAtomValue } from "jotai";
import { ArrowLeft } from "lucide-react";

import { personalRecommendationResultAtom } from "@/features/personalRecommendation/application/selectors/personalRecommendationSelectors";
import { userPreferenceAtom } from "@/features/preference/application/selectors/preferenceSelectors";
import { getPreferenceSummaryKeywords } from "@/features/preference/application/mapper/getPreferenceSummaryKeywords";

import { useCompletePersonalRecommendationSelection } from "@/features/personalRecommendation/application/hooks/useCompletePersonalRecommendationSelection";
import { useRerollPersonalRecommendation } from "@/features/personalRecommendation/application/hooks/useRerollPersonalRecommendation";

import { useLocationSetting } from "@/features/locationSetting/application/hooks/useLocationSetting";

import PersonalRecommendationResultCard from "@/features/personalRecommendation/ui/components/PersonalRecommendationResultCard";
import PersonalRecommendationResultActionButtons from "@/features/personalRecommendation/ui/components/PersonalRecommendationResultActionButtons";

import AuthRequiredGuard from "@/features/routeGuard/ui/components/AuthRequiredGuard";

import { personalRecommendationResultPageStyles } from "@/ui/styles/personalRecommendationResultPageStyles";

export default function PersonalRecommendationResultPage() {
    return (
        <AuthRequiredGuard>
            <PersonalRecommendationResultPageContent />
        </AuthRequiredGuard>
    );
}

function PersonalRecommendationResultPageContent() {
    const router = useRouter();

    const recommendation = useAtomValue(personalRecommendationResultAtom);
    const preference = useAtomValue(userPreferenceAtom);

    // 서버에 저장된 개인 위치 조회
    const {
        location,
        isLoading: isLocationLoading,
    } = useLocationSetting();

    const { isCompleting, completeSelection } =
        useCompletePersonalRecommendationSelection();

    const { isRerolling, rerollRecommendation } =
        useRerollPersonalRecommendation();

    const [selectedCandidateId, setSelectedCandidateId] =
        useState<number | null>(recommendation?.selectedCandidateId ?? null);

    useEffect(() => {
        if (!recommendation) {
            router.replace("/personal-recommendation");
        }
    }, [recommendation, router]);

    if (!recommendation) {
        return null;
    }

    const isClosed = recommendation.status !== "OPEN";
    const keywords = getPreferenceSummaryKeywords(preference);

    const handleCompleteSelection = async () => {
        if (!selectedCandidateId) {
            alert("추천 메뉴를 먼저 선택해 주세요.");
            return;
        }

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
            alert(
                "설정된 위치가 없습니다. 위치를 설정해주세요.",
            );
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
        const nextRecommendation = await rerollRecommendation(
            recommendation.requestId,
            "NOT_SATISFIED",
        );

        if (nextRecommendation) {
            setSelectedCandidateId(null);
        }
    };

    return (
        <main className={personalRecommendationResultPageStyles.container}>
            <button
                type="button"
                onClick={() => router.push("/personal-recommendation")}
                className={personalRecommendationResultPageStyles.backButton}
            >
                <ArrowLeft size={24} />
            </button>

            <h1 className={personalRecommendationResultPageStyles.title}>
                메뉴 추천 결과
            </h1>

            {isClosed && (
                <p className={personalRecommendationResultPageStyles.closedMessage}>
                    메뉴 추천이 종료되었습니다.
                </p>
            )}

            <section className={personalRecommendationResultPageStyles.summaryCard}>
                <h2 className={personalRecommendationResultPageStyles.summaryTitle}>
                    취향 프로필 요약
                </h2>

                <div className={personalRecommendationResultPageStyles.keywordGroup}>
                    {keywords.length > 0 ? (
                        keywords.map((keyword) => (
                            <span
                                key={keyword}
                                className={
                                    personalRecommendationResultPageStyles.keywordChip
                                }
                            >
                                #{keyword}
                            </span>
                        ))
                    ) : (
                        <span
                            className={
                                personalRecommendationResultPageStyles.emptyText
                            }
                        >
                            표시할 취향 정보가 없습니다.
                        </span>
                    )}
                </div>
            </section>

            <section className={personalRecommendationResultPageStyles.cardGrid}>
                {recommendation.candidates.map((candidate) => (
                    <PersonalRecommendationResultCard
                        key={candidate.id}
                        candidateId={candidate.id}
                        menuName={candidate.menuName}
                        score={candidate.score}
                        thumbnailUrl={candidate.thumbnailUrl}
                        selected={selectedCandidateId === candidate.id}
                        disabled={isClosed}
                        onSelect={setSelectedCandidateId}
                        onClickRestaurant={handleClickRestaurant}
                    />
                ))}
            </section>

            <PersonalRecommendationResultActionButtons
                onRetryRecommendation={handleRetryRecommendation}
                onCompleteSelection={handleCompleteSelection}
                canCompleteSelection={selectedCandidateId !== null}
                isRetryRecommendationLoading={isRerolling}
                isCompleteSelectionLoading={isCompleting}
                isClosed={isClosed}
            />
        </main>
    );
}