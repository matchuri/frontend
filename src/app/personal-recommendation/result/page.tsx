"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAtomValue } from "jotai";
import { ArrowLeft } from "lucide-react";

import { personalRecommendationResultAtom } from "@/features/personalRecommendation/application/selectors/personalRecommendationSelectors";
import { userPreferenceAtom } from "@/features/preference/application/selectors/preferenceSelectors";
import { getPreferenceSummaryKeywords } from "@/features/preference/application/mapper/getPreferenceSummaryKeywords";
import { useCompletePersonalRecommendationSelection } from "@/features/personalRecommendation/application/hooks/useCompletePersonalRecommendationSelection";

import PersonalRecommendationResultCard from "@/features/personalRecommendation/ui/components/PersonalRecommendationResultCard";
import PersonalRecommendationResultActionButtons from "@/features/personalRecommendation/ui/components/PersonalRecommendationResultActionButtons";

import { personalRecommendationResultPageStyles } from "@/ui/styles/personalRecommendationResultPageStyles";

export default function PersonalRecommendationResultPage() {
    const router = useRouter();

    const recommendation = useAtomValue(personalRecommendationResultAtom);
    const preference = useAtomValue(userPreferenceAtom);

    const { isCompleting, completeSelection } =
        useCompletePersonalRecommendationSelection();

    const [selectedCandidateId, setSelectedCandidateId] = useState<number | null>(
        recommendation?.selectedCandidateId ?? null,
    );

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

        await completeSelection(recommendation.requestId, selectedCandidateId);
    };

    // 맛집 보기 버튼 클릭
    const handleClickRestaurant = (candidateId: number) => {
        const candidate = recommendation.candidates.find(
            (item) => item.id === candidateId,
        );

        if (!candidate) {
            return;
        }

        router.push(
            `/recommendation-restaurants?menuName=${encodeURIComponent(
                candidate.menuName,
            )}&source=personal`,
        );
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
                        selected={selectedCandidateId === candidate.id}
                        disabled={isClosed}
                        onSelect={setSelectedCandidateId}
                        onClickRestaurant={handleClickRestaurant}
                    />
                ))}
            </section>

            <PersonalRecommendationResultActionButtons
                onRetryRecommendation={() => {
                    console.log("재요청");
                }}
                onCompleteSelection={handleCompleteSelection}
                canCompleteSelection={selectedCandidateId !== null}
                isCompleteSelectionLoading={isCompleting}
                isClosed={isClosed}
            />
        </main>
    );
}