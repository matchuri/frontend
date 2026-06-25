import { groupRecommendationPreparationPageStyles } from "@/ui/styles/groupRecommendationPreparationPageStyles";

export default function GroupRecommendationResultPage() {
    return (
        <main className={groupRecommendationPreparationPageStyles.container}>
            <div className={groupRecommendationPreparationPageStyles.content}>
                <h1 className={groupRecommendationPreparationPageStyles.title}>
                    그룹 메뉴 추천 결과
                </h1>
            </div>
        </main>
    );
}