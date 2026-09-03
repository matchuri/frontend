"use client";

import { useAtomValue } from "jotai";
import { useHomeGuard } from "@/features/routeGuard/application/hooks/useHomeGuard";
import { useHomeData } from "@/features/home/application/hooks/useHomeData";

import {
    homeDataAtom,
    homeErrorMessageAtom,
    isHomeLoadingAtom,
} from "@/features/home/application/selectors/homeSelectors";

import HomeHeader from "@/features/home/ui/components/HomeHeader";
import HomeRecommendationHero from "@/features/home/ui/components/HomeRecommendationHero";
import HomeTasteProfileCard from "@/features/home/ui/components/HomeTasteProfileCard";
import HomeRecommendationHistory from "@/features/home/ui/components/HomeRecommendationHistory";
import HomeRecentGroupActivity from "@/features/home/ui/components/HomeRecentGroupActivity";

import { homeMemberPageStyles } from "@/ui/styles/homeMemberPageStyles";

export default function HomePage() {
    const { canAccess } = useHomeGuard();
    const { refetchHome } = useHomeData(canAccess);

    const homeData = useAtomValue(homeDataAtom);
    const isHomeLoading = useAtomValue(isHomeLoadingAtom);
    const homeErrorMessage = useAtomValue(homeErrorMessageAtom);

    if (!canAccess) {
        return null;
    }

    if (isHomeLoading && !homeData) {
        return (
            <main className={homeMemberPageStyles.stateContainer}>
                <p className={homeMemberPageStyles.stateText}>
                    홈 정보를 불러오는 중입니다.
                </p>
            </main>
        );
    }

    if (homeErrorMessage && !homeData) {
        return (
            <main className={homeMemberPageStyles.stateContainer}>
                <p className={homeMemberPageStyles.errorText}>
                    {homeErrorMessage}
                </p>

                <button
                    type="button"
                    onClick={() => void refetchHome()}
                    className={homeMemberPageStyles.retryButton}
                >
                    다시 시도
                </button>
            </main>
        );
    }

    if (!homeData) {
        return null;
    }

    return (
        <main className={homeMemberPageStyles.container}>
            <HomeHeader
                nickname={homeData.user.nickname}
                address={
                    homeData.location?.address ??
                    "설정된 위치가 없습니다."
                }
            />

            <div className={homeMemberPageStyles.content}>
                <HomeRecommendationHero />

                <HomeTasteProfileCard
                    attributes={homeData.tasteProfile.attributes}
                />

                <HomeRecommendationHistory
                    items={homeData.personalRecommendationHistory}
                />

                <HomeRecentGroupActivity
                    items={homeData.recentGroupActivities}
                />
            </div>
        </main>
    );
}