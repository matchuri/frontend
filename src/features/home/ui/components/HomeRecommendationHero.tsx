import {
    ArrowRight,
    Sparkles,
} from "lucide-react";

import { homeMemberPageStyles } from "@/ui/styles/homeMemberPageStyles";

export default function HomeRecommendationHero() {
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
                    className={homeMemberPageStyles.heroButton}
                >
                    메뉴 추천 시작하기

                    <ArrowRight
                        size={18}
                        aria-hidden="true"
                    />
                </button>
            </div>
        </section>
    );
}