import { Utensils } from "lucide-react";
import { personalRecommendationLoadingStyles } from "@/ui/styles/personalRecommendationLoadingStyles";

export default function PersonalRecommendationLoadingView() {
    return (
        <main className={personalRecommendationLoadingStyles.container}>
            <section className={personalRecommendationLoadingStyles.card}>
                <div className={personalRecommendationLoadingStyles.iconWrapper}>
                    <div className={personalRecommendationLoadingStyles.spinner} />
                    <div className={personalRecommendationLoadingStyles.iconCircle}>
                        <Utensils size={54} />
                    </div>
                </div>

                <h1 className={personalRecommendationLoadingStyles.title}>
                    취향을 분석하고 있습니다...
                </h1>

                <p className={personalRecommendationLoadingStyles.description}>
                    당신을 위한 완벽한 3가지 메뉴를 찾아드릴게요
                </p>
            </section>
        </main>
    );
}