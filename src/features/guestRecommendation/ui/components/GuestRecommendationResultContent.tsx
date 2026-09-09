import { ArrowLeft, Sparkles } from "lucide-react";

import type { GuestRecommendedMenu } from "@/features/guestRecommendation/domain/model/GuestRecommendation";

import GuestRecommendationResultCard from "@/features/guestRecommendation/ui/components/GuestRecommendationResultCard";

import { guestRecommendationResultPageStyles } from "@/ui/styles/guestRecommendationResultPageStyles";

interface GuestRecommendationResultContentProps {
    readonly candidates: readonly GuestRecommendedMenu[];
    readonly onBack: () => void;
    readonly onClickRestaurant: (menuId: number) => void;
}

export default function GuestRecommendationResultContent({
    candidates,
    onBack,
    onClickRestaurant,
}: GuestRecommendationResultContentProps) {
    return (
        <main className={guestRecommendationResultPageStyles.page}>
            <header className={guestRecommendationResultPageStyles.header}>
                <button
                    type="button"
                    onClick={onBack}
                    className={guestRecommendationResultPageStyles.backButton}
                    aria-label="메인 화면으로 돌아가기"
                >
                    <ArrowLeft size={22} strokeWidth={2} aria-hidden="true" />
                </button>

                <h1 className={guestRecommendationResultPageStyles.headerTitle}>
                    메뉴 추천 결과
                </h1>

                <div className={guestRecommendationResultPageStyles.headerSpacer} />
            </header>

            <div className={guestRecommendationResultPageStyles.content}>
                <section className={guestRecommendationResultPageStyles.intro}>
                    <div className={guestRecommendationResultPageStyles.introIcon}>
                        <Sparkles size={18} strokeWidth={2} aria-hidden="true" />
                    </div>

                    <div>
                        <h2 className={guestRecommendationResultPageStyles.introTitle}>
                            이런 메뉴는 어때요?
                        </h2>

                        <p className={guestRecommendationResultPageStyles.introDescription}>
                            입력한 취향을 바탕으로 잘 어울리는 메뉴 3가지를 골랐어요.
                        </p>
                    </div>
                </section>

                <section className={guestRecommendationResultPageStyles.resultSection}>
                    <div className={guestRecommendationResultPageStyles.resultHeader}>
                        <div>
                            <span className={guestRecommendationResultPageStyles.resultEyebrow}>
                                MATCHURI PICK
                            </span>

                            <h2 className={guestRecommendationResultPageStyles.resultTitle}>
                                추천 메뉴
                            </h2>
                        </div>
                    </div>

                    <div className={guestRecommendationResultPageStyles.cardList}>
                        {candidates.map((candidate) => (
                            <GuestRecommendationResultCard
                                key={candidate.menuId}
                                candidate={candidate}
                                onClickRestaurant={onClickRestaurant}
                            />
                        ))}
                    </div>
                </section>

                <p className={guestRecommendationResultPageStyles.guideText}>
                    맛집 보기를 누르면 설정한 위치 주변의 맛집을 확인할 수 있어요.
                </p>
            </div>
        </main>
    );
}