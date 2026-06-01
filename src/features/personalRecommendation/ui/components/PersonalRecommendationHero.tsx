import { personalRecommendationPageStyles } from "@/ui/styles/personalRecommendationPageStyles";

interface PersonalRecommendationHeroProps {
    readonly onStart: () => void;
    readonly isStarting: boolean;
    readonly buttonLabel?: string;
}

export default function PersonalRecommendationHero({
    onStart,
    isStarting,
    buttonLabel = "메뉴 추천 시작하기",
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
                disabled={isStarting}
                className={personalRecommendationPageStyles.primaryButton}
            >
                {isStarting ? "처리 중..." : buttonLabel}
            </button>
        </section>
    );
}