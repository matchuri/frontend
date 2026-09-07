"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { useHomeGuard } from "@/features/routeGuard/application/hooks/useHomeGuard";
import { usePersonalRecommendationHistories } from "@/features/personalRecommendation/application/hooks/usePersonalRecommendationHistories";
import { usePersonalRecommendationResultNavigation } from "@/features/personalRecommendation/application/hooks/usePersonalRecommendationResultNavigation";

import PersonalRecommendationHistoryList from "@/features/personalRecommendation/ui/components/PersonalRecommendationHistoryList";

import { personalRecommendationHistoryPageStyles } from "@/ui/styles/personalRecommendationHistoryPageStyles";

export default function PersonalRecommendationHistoryPage() {
    const router = useRouter();

    const { canAccess } = useHomeGuard();

    const {
        histories,
        isLoading,
        errorMessage,
        refetchHistories,
    } = usePersonalRecommendationHistories(
        canAccess,
    );

    const {
        moveToRecommendationResult,
    } = usePersonalRecommendationResultNavigation();

    if (!canAccess) {
        return null;
    }

    if (isLoading) {
        return (
            <main className={personalRecommendationHistoryPageStyles.stateContainer}>
                <p className={personalRecommendationHistoryPageStyles.stateText}>
                    개인 메뉴 추천 이력을 불러오는 중입니다.
                </p>
            </main>
        );
    }

    if (errorMessage) {
        return (
            <main className={personalRecommendationHistoryPageStyles.stateContainer}>
                <p className={personalRecommendationHistoryPageStyles.errorText}>
                    {errorMessage}
                </p>

                <button
                    type="button"
                    onClick={() => void refetchHistories()}
                    className={personalRecommendationHistoryPageStyles.retryButton}
                >
                    다시 시도
                </button>
            </main>
        );
    }

    const handleClickBack = () => {
        router.push("/home");
    };

    return (
        <main className={personalRecommendationHistoryPageStyles.page}>
            <header className={personalRecommendationHistoryPageStyles.header}>
                <button
                    type="button"
                    onClick={handleClickBack}
                    className={personalRecommendationHistoryPageStyles.backButton}
                    aria-label="홈으로 돌아가기"
                >
                    <ArrowLeft
                        size={22}
                        aria-hidden="true"
                    />
                </button>

                <h1 className={personalRecommendationHistoryPageStyles.title}>
                    지난 메뉴 추천 기록
                </h1>
            </header>

            <div className={personalRecommendationHistoryPageStyles.content}>
                <PersonalRecommendationHistoryList
                    histories={histories}
                    onClickHistory={moveToRecommendationResult}
                />
            </div>
        </main>
    );
}