import type { ReactNode } from "react";
import { CookingPot } from "lucide-react";

import { recommendationLoadingStyles } from "@/ui/styles/recommendationLoadingStyles";

interface RecommendationLoadingViewProps {
    readonly title?: string;
    readonly description?: ReactNode;
    readonly status?: string;
}

export default function RecommendationLoadingView({
    title = "메뉴를 추천하고 있어요",
    description = (
        <>
            선택한 취향을 바탕으로
            <br />
            잘 어울리는 메뉴 3가지를 찾고 있어요.
        </>
    ),
    status = "취향을 분석하는 중",
}: RecommendationLoadingViewProps) {
    return (
        <main className={recommendationLoadingStyles.container}>
            <section className={recommendationLoadingStyles.content}>
                <div className={recommendationLoadingStyles.visual}>
                    <span className={recommendationLoadingStyles.sparkleTop} />
                    <span className={recommendationLoadingStyles.sparkleRight} />
                    <span className={recommendationLoadingStyles.sparkleBottom} />
                    <span className={recommendationLoadingStyles.sparkleLeft} />

                    <CookingPot
                        size={42}
                        strokeWidth={1.7}
                        className={recommendationLoadingStyles.mainIcon}
                        aria-hidden="true"
                    />
                </div>

                <div className={recommendationLoadingStyles.textArea}>
                    <h1 className={recommendationLoadingStyles.title}>
                        {title}
                    </h1>

                    <p className={recommendationLoadingStyles.description}>
                        {description}
                    </p>
                </div>

                <div className={recommendationLoadingStyles.status}>
                    <span className={recommendationLoadingStyles.statusDot} />
                    {status}
                </div>
            </section>
        </main>
    );
}