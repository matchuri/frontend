import {
    ArrowRight,
    Sparkles,
} from "lucide-react";

import { homeMemberPageStyles } from "@/ui/styles/homeMemberPageStyles";

interface HomeRecommendationHeroProps {
    readonly onStart: () => void;
    readonly isStarting: boolean;
    readonly buttonLabel: string;
}

export default function HomeRecommendationHero({
    onStart,
    isStarting,
    buttonLabel,
}: HomeRecommendationHeroProps) {
    return (
        <section className={homeMemberPageStyles.hero}>
            <div className={homeMemberPageStyles.heroDecoration} />

            <div className={homeMemberPageStyles.heroContent}>
                <div className={homeMemberPageStyles.heroBadge}>
                    <Sparkles
                        size={13}
                        aria-hidden="true"
                    />

                    오늘의 메뉴 고민 해결사
                </div>

                <h1 className={homeMemberPageStyles.heroTitle}>
                    오늘 뭐 먹지?
                    <br />
                    고민은 이제 그만!
                </h1>

                <p className={homeMemberPageStyles.heroDescription}>
                    나의 취향과 설정한 위치를 바탕으로 딱 맞는 메뉴를 추천해드려요.
                </p>

                <button
                    type="button"
                    onClick={onStart}
                    disabled={isStarting}
                    className={homeMemberPageStyles.heroButton}
                >
                    {isStarting
                        ? "메뉴 추천 중..."
                        : buttonLabel}

                    <ArrowRight
                        size={18}
                        aria-hidden="true"
                    />
                </button>
            </div>
        </section>
    );
}