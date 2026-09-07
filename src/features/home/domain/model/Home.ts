import type { HomeGroupActivityType } from "@/features/home/domain/model/HomeGroupActivityType";

export interface HomeUser {
    readonly nickname: string;
    readonly profileImageUrl: string | null;
}

export interface HomePersonalRecommendation {
    readonly latestRecommendationId: number | null;
    readonly latestRecommendationStatus: "OPEN" | null;
}

export interface HomeLocation {
    readonly longitude: number;
    readonly latitude: number;
    readonly address: string;
}

export interface HomeTasteProfile {
    readonly attributes: readonly string[];
}

export interface HomePersonalRecommendationHistoryItem {
    readonly id: number;
    readonly menuName: string;
    readonly recommendedDate: string;
    readonly categories: readonly string[];
}

export interface HomeRecentGroupActivity {
    readonly groupId: number;
    readonly groupName: string;
    readonly type: HomeGroupActivityType;
    readonly details: {
        readonly recommendationId: number;
        readonly createdAt: string;
        readonly startedAt: string | null;
        readonly endedAt: string | null;
        readonly selectedMenuName: string | null;
    };
}

export interface HomeData {
    readonly user: HomeUser;
    readonly personalRecommendation: HomePersonalRecommendation;
    readonly location: HomeLocation | null;
    readonly tasteProfile: HomeTasteProfile;
    readonly personalRecommendationHistory:
        readonly HomePersonalRecommendationHistoryItem[];
    readonly recentGroupActivities:
        readonly HomeRecentGroupActivity[];
}