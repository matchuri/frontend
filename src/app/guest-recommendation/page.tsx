import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import GuestRecommendationPageContent from "@/features/guestRecommendation/ui/components/GuestRecommendationPageContent";

import { guestRecommendationPageStyles } from "@/ui/styles/guestRecommendationPageStyles";

export default function GuestRecommendationPage() {
    return (
        <GuestRecommendationPageContent
            header={
                <header className={guestRecommendationPageStyles.header}>
                    <Link
                        href="/"
                        className={guestRecommendationPageStyles.backButton}
                        aria-label="비로그인 메인으로 돌아가기"
                    >
                        <ArrowLeft size={22} strokeWidth={2} aria-hidden="true" />
                    </Link>

                    <h1 className={guestRecommendationPageStyles.headerTitle}>
                        메뉴 추천 설정
                    </h1>

                    <div className={guestRecommendationPageStyles.headerSpacer} />
                </header>
            }
            intro={
                <section className={guestRecommendationPageStyles.intro}>
                    <h2 className={guestRecommendationPageStyles.introTitle}>
                        오늘의 메뉴를 찾아볼까요?
                    </h2>

                    <p className={guestRecommendationPageStyles.introDescription}>
                        취향과 식사할 위치를 설정하면 지금 먹기 좋은 메뉴를 추천해드릴게요.
                    </p>
                </section>
            }
        />
    );
}