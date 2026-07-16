"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";

import type { PersonalRecommendation } from "@/features/personalRecommendation/domain/model/PersonalRecommendation";

import PersonalRecommendationResultCard from "@/features/personalRecommendation/ui/components/PersonalRecommendationResultCard";
import PersonalRecommendationResultActionButtons from "@/features/personalRecommendation/ui/components/PersonalRecommendationResultActionButtons";

import { personalRecommendationResultPageStyles } from "@/ui/styles/personalRecommendationResultPageStyles";

interface PersonalRecommendationResultContentProps {
    readonly recommendation: PersonalRecommendation;
    readonly keywords: readonly string[];

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

    const handleCompleteSelection = async () => {
        if (selectedCandidateId === null) {
            alert("추천 메뉴를 먼저 선택해 주세요.");
            return;
        }

        await onCompleteSelection(selectedCandidateId);
    };

    return (
        <main className={personalRecommendationResultPageStyles.container}>
            <button
                type="button"
                onClick={onBack}
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
                        onClickRestaurant={onClickRestaurant}
                    />
                ))}
            </section>

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