"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAtomValue } from "jotai";
import { ArrowLeft } from "lucide-react";

import { personalRecommendationResultAtom } from "@/features/personalRecommendation/application/selectors/personalRecommendationSelectors";
import { userPreferenceAtom } from "@/features/preference/application/selectors/preferenceSelectors";
import { getPreferenceSummaryKeywords } from "@/features/preference/application/mapper/getPreferenceSummaryKeywords";

import PersonalRecommendationResultCard from "@/features/personalRecommendation/ui/components/PersonalRecommendationResultCard";
import PersonalRecommendationResultActionButtons from "@/features/personalRecommendation/ui/components/PersonalRecommendationResultActionButtons";

import { personalRecommendationResultPageStyles } from "@/ui/styles/personalRecommendationResultPageStyles";

export default function PersonalRecommendationResultPage() {
    const router = useRouter();

    const recommendation = useAtomValue(personalRecommendationResultAtom);
    const preference = useAtomValue(userPreferenceAtom);

    useEffect(() => {
        if (!recommendation) {
            router.replace("/personal-recommendation");
        }
    }, [recommendation, router]);

    if (!recommendation) {
        return null;
    }

    const keywords = getPreferenceSummaryKeywords(preference);

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
                        <span className={personalRecommendationResultPageStyles.emptyText}>
                            표시할 취향 정보가 없습니다.
                        </span>
                    )}
                </div>
            </section>

            <section className={personalRecommendationResultPageStyles.cardGrid}>
                {recommendation.candidates.map((candidate) => (
                    <PersonalRecommendationResultCard
                        key={candidate.id}
                        menuName={candidate.menuName}
                        score={candidate.score}
                    />
                ))}
            </section>

            <PersonalRecommendationResultActionButtons
                onRetryRecommendation={() => {
                    console.log("재요청");
                }}
                onCompleteSelection={() => {
                    console.log("선택 완료");
                }}
            />
        </main>
    );
}