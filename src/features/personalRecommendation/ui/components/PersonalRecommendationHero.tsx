import { personalRecommendationPageStyles } from "@/ui/styles/personalRecommendationPageStyles";

interface PersonalRecommendationHeroProps {
    readonly onStart: () => void;
}

export default function PersonalRecommendationHero({
    onStart,
}: PersonalRecommendationHeroProps) {
    return (
        <section className={personalRecommendationPageStyles.heroCard}>
            <div>
                <h2 className={personalRecommendationPageStyles.heroTitle}>
                    당신의 완벽한 한 끼를 찾아보세요.
                </h2>

                <p className={personalRecommendationPageStyles.heroDescription}>
                    설정한 취향과 현재 위치를 기반으로 최적화된 미식 경험을 제안합니다.
                </p>
            </div>

            <button
                type="button"
                onClick={onStart}
                className={personalRecommendationPageStyles.primaryButton}
            >
                메뉴 추천 시작하기
            </button>
        </section>
    );
}