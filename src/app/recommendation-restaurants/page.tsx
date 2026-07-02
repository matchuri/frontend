import { Suspense } from "react";

import RecommendationRestaurantPageContent from "@/features/recommendationRestaurant/ui/components/RecommendationRestaurantPageContent";

export default function RecommendationRestaurantPage() {
    return (
        <Suspense fallback={<main className="min-h-screen bg-[#EEF7FC] px-16 py-12">맛집 정보를 불러오는 중입니다.</main>}>
            <RecommendationRestaurantPageContent />
        </Suspense>
    );
}