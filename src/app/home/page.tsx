"use client";

import { useHomeGuard } from "@/features/routeGuard/application/hooks/useHomeGuard";

import HomeHeader from "@/features/home/ui/components/HomeHeader";
import HomeRecommendationHero from "@/features/home/ui/components/HomeRecommendationHero";
import HomeTasteProfileCard from "@/features/home/ui/components/HomeTasteProfileCard";
import HomeRecommendationHistory from "@/features/home/ui/components/HomeRecommendationHistory";
import HomeRecentGroupActivity from "@/features/home/ui/components/HomeRecentGroupActivity";

import { mockHomeData } from "@/features/home/ui/mock/mockHomeData";

import { homeMemberPageStyles } from "@/ui/styles/homeMemberPageStyles";

export default function HomePage() {
    const { canAccess } = useHomeGuard();

    if (!canAccess) {
        return null;
    }

    return (
        <main className={homeMemberPageStyles.container}>
            <HomeHeader
                nickname={mockHomeData.user.nickname}
                address={mockHomeData.location.address}
            />

            <div className={homeMemberPageStyles.content}>
                <HomeRecommendationHero />

                <HomeTasteProfileCard
                    attributes={
                        mockHomeData.tasteProfile.attributes
                    }
                />

                <HomeRecommendationHistory
                    items={
                        mockHomeData.personalRecommendationHistory
                    }
                />

                <HomeRecentGroupActivity
                    items={
                        mockHomeData.recentGroupActivities
                    }
                />
            </div>
        </main>
    );
}