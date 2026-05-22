import { Heart } from "lucide-react";
import { personalRecommendationPageStyles } from "@/ui/styles/personalRecommendationPageStyles";

export default function PersonalRecommendationPreferenceCard() {
    return (
        <section className={personalRecommendationPageStyles.preferenceCard}>
            <div className={personalRecommendationPageStyles.preferenceIconBox}>
                <Heart size={22} />
            </div>

            <div className={personalRecommendationPageStyles.cardTextGroup}>
                <h3 className={personalRecommendationPageStyles.cardTitle}>
                    취향 프로필
                </h3>
            </div>

            <button
                type="button"
                className={personalRecommendationPageStyles.smallButton}
            >
                취향 수정하기
            </button>
        </section>
    );
}