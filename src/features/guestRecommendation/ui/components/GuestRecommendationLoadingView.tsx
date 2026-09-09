import { CookingPot } from "lucide-react";

import { guestRecommendationLoadingStyles } from "@/ui/styles/guestRecommendationLoadingStyles";

export default function GuestRecommendationLoadingView() {
    return (
        <main className={guestRecommendationLoadingStyles.container}>
            <section className={guestRecommendationLoadingStyles.content}>
                <div className={guestRecommendationLoadingStyles.visual}>
                    <span className={guestRecommendationLoadingStyles.sparkleTop} />
                    <span className={guestRecommendationLoadingStyles.sparkleRight} />
                    <span className={guestRecommendationLoadingStyles.sparkleBottom} />
                    <span className={guestRecommendationLoadingStyles.sparkleLeft} />

                    <CookingPot
                        size={42}
                        strokeWidth={1.7}
                        className={guestRecommendationLoadingStyles.mainIcon}
                        aria-hidden="true"
                    />
                </div>

                <div className={guestRecommendationLoadingStyles.textArea}>
                    <h1 className={guestRecommendationLoadingStyles.title}>
                        메뉴를 추천하고 있어요
                    </h1>

                    <p className={guestRecommendationLoadingStyles.description}>
                        선택한 취향을 바탕으로
                        <br />
                        잘 어울리는 메뉴 3가지를 찾고 있어요.
                    </p>
                </div>

                <div className={guestRecommendationLoadingStyles.status}>
                    <span className={guestRecommendationLoadingStyles.statusDot} />
                    취향을 분석하는 중
                </div>
            </section>
        </main>
    );
}