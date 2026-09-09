"use client";

import { useGuestRecommendationResult } from "@/features/guestRecommendation/application/hooks/useGuestRecommendationResult";

import GuestRecommendationResultContent from "@/features/guestRecommendation/ui/components/GuestRecommendationResultContent";

export default function GuestRecommendationResultPage() {
    const {
        recommendation,
        candidates,
        moveToHome,
    } = useGuestRecommendationResult();

    if (recommendation === null) {
        return null;
    }

    return (
        <GuestRecommendationResultContent
            candidates={candidates}
            onBack={moveToHome}
        />
    );
}