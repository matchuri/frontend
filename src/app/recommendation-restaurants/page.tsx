import { Suspense } from "react";

import RecommendationRestaurantPageContent from "@/features/recommendationRestaurant/ui/components/RecommendationRestaurantPageContent";

export default function RecommendationRestaurantPage() {
    return (
        <Suspense>
            <RecommendationRestaurantPageContent />
        </Suspense>
    );
}