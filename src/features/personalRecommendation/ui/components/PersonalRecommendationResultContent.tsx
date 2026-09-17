"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";

import type { LocationSetting } from "@/features/locationSetting/domain/model/LocationSetting";
import type { PersonalRecommendation } from "@/features/personalRecommendation/domain/model/PersonalRecommendation";

import PersonalRecommendationResultCard from "@/features/personalRecommendation/ui/components/PersonalRecommendationResultCard";
import PersonalRecommendationResultActionButtons from "@/features/personalRecommendation/ui/components/PersonalRecommendationResultActionButtons";
import PersonalRecommendationSelectedResultContent from "@/features/personalRecommendation/ui/components/PersonalRecommendationSelectedResultContent";

import { personalRecommendationResultPageStyles } from "@/ui/styles/personalRecommendationResultPageStyles";

interface PersonalRecommendationResultContentProps {
    readonly recommendation: PersonalRecommendation;
    readonly keywords: readonly string[];
    readonly location: LocationSetting | null;
    readonly isLocationLoading: boolean;

    readonly isCompleting: boolean;
    readonly isRerolling: boolean;

    readonly onBack: () => void;
    readonly onCompleteSelection: (
        selectedCandidateId: number,
    ) => Promise<void>;
    readonly onRetryRecommendation: () => Promise<void>;
    readonly onClickRestaurant: (candidateId: number) => void;
}

export default function PersonalRecommendationResultContent({
    recommendation,
    keywords,
    location,
    isLocationLoading,
    isCompleting,
    isRerolling,
    onBack,
    onCompleteSelection,
    onRetryRecommendation,
    onClickRestaurant,
}: PersonalRecommendationResultContentProps) {
    const [selectedCandidateId, setSelectedCandidateId] =
        useState<number | null>(
            recommendation.selectedCandidateId ?? null,
        );

    const isClosed = recommendation.status !== "OPEN";

    const selectedCandidate = recommendation.candidates.find(
        (candidate) =>
            candidate.id === recommendation.selectedCandidateId,
    );

    const handleCompleteSelection = async () => {
        if (selectedCandidateId === null) {
            alert("추천 메뉴를 먼저 선택해 주세요.");
            return;
        }

        await onCompleteSelection(selectedCandidateId);
    };

    if (isClosed && selectedCandidate) {
        return (
            <PersonalRecommendationSelectedResultContent
                selectedCandidate={selectedCandidate}
                keywords={keywords}
                location={location}
                isLocationLoading={isLocationLoading}
                onBack={onBack}
            />
        );
    }

    return (
        <main className={personalRecommendationResultPageStyles.page}>
            <header className={personalRecommendationResultPageStyles.header}>
                <button
                    type="button"
                    onClick={onBack}
                    className={personalRecommendationResultPageStyles.backButton}
                    aria-label="홈으로 돌아가기"
                >
                    <ArrowLeft size={22} strokeWidth={2} aria-hidden="true" />
                </button>

                <h1 className={personalRecommendationResultPageStyles.headerTitle}>
                    메뉴 추천 결과
                </h1>

                <div className={personalRecommendationResultPageStyles.headerSpacer} />
            </header>

            <div className={personalRecommendationResultPageStyles.content}>
                <section className={personalRecommendationResultPageStyles.summaryCard}>
                    <div className={personalRecommendationResultPageStyles.summaryHeader}>
                        <span className={personalRecommendationResultPageStyles.summaryEyebrow}>
                            MY TASTE
                        </span>

                        <h2 className={personalRecommendationResultPageStyles.summaryTitle}>
                            취향 프로필 요약
                        </h2>
                    </div>

                    <div className={personalRecommendationResultPageStyles.keywordGroup}>
                        {keywords.length > 0 ? (
                            keywords.map((keyword) => (
                                <span
                                    key={keyword}
                                    className={personalRecommendationResultPageStyles.keywordChip}
                                >
                                    #{keyword}
                                </span>
                            ))
                        ) : (
                            <span className={personalRecommendationResultPageStyles.emptyText}>
                                표시할 취향 정보가 없습니다.
                            </span>
                        )}
                    </div>
                </section>

                <section className={personalRecommendationResultPageStyles.resultSection}>
                    <div className={personalRecommendationResultPageStyles.resultHeader}>
                        <div>
                            <span className={personalRecommendationResultPageStyles.resultEyebrow}>
                                MATCHURI PICK
                            </span>

                            <h2 className={personalRecommendationResultPageStyles.resultTitle}>
                                추천 메뉴
                            </h2>
                        </div>

                        <span className={personalRecommendationResultPageStyles.selectionGuide}>
                            취향인 메뉴 하나를 선택해 주세요
                        </span>
                    </div>

                    <div className={personalRecommendationResultPageStyles.cardList}>
                        {recommendation.candidates.map((candidate) => (
                            <PersonalRecommendationResultCard
                                key={candidate.id}
                                candidateId={candidate.id}
                                menuName={candidate.menuName}
                                rankNo={candidate.rankNo}
                                score={candidate.score}
                                thumbnailUrl={candidate.thumbnailUrl}
                                selected={selectedCandidateId === candidate.id}
                                disabled={isClosed}
                                onSelect={setSelectedCandidateId}
                                onClickRestaurant={onClickRestaurant}
                            />
                        ))}
                    </div>
                </section>
            </div>

            <PersonalRecommendationResultActionButtons
                onRetryRecommendation={onRetryRecommendation}
                onCompleteSelection={handleCompleteSelection}
                canCompleteSelection={selectedCandidateId !== null}
                isRetryRecommendationLoading={isRerolling}
                isCompleteSelectionLoading={isCompleting}
                isClosed={isClosed}
            />
        </main>
    );
}