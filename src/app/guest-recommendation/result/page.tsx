"use client";

import { useGuestRecommendationResult } from "@/features/guestRecommendation/application/hooks/useGuestRecommendationResult";
import { useGuestRecommendationRestaurantNavigation } from "@/features/guestRecommendation/application/hooks/useGuestRecommendationRestaurantNavigation";

import GuestRecommendationResultContent from "@/features/guestRecommendation/ui/components/GuestRecommendationResultContent";
import GuestRecommendationResultSkeleton from "@/features/guestRecommendation/ui/components/GuestRecommendationResultSkeleton";

export default function GuestRecommendationResultPage() {
    const {
        recommendation,
        candidates,
        moveToHome,
    } = useGuestRecommendationResult();

    const {
        moveToRestaurants,
    } = useGuestRecommendationRestaurantNavigation();

    if (recommendation === null) {
        return <GuestRecommendationResultSkeleton />;
    }

    return (
        <GuestRecommendationResultContent
            candidates={candidates}
            onBack={moveToHome}
            onClickRestaurant={moveToRestaurants}
        />
    );
}