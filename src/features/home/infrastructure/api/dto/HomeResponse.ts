import type { HomeGroupActivityType } from "@/features/home/domain/model/HomeGroupActivityType";

interface HomeAttributeCategoryResponse {
    readonly id: number;
    readonly categoryType: string;
    readonly code: string;
    readonly name: string;
    readonly sortOrder: number;
}

export interface HomeResponse {
    readonly success: boolean;
    readonly data: {
        readonly user: {
            readonly nickname: string;
            readonly profileImageUrl: string | null;
        };

        readonly personalRecommendation: {
            readonly latestRecommendationId: number | null;
            readonly latestRecommendationStatus: "OPEN" | null;
        };

        readonly location: {
            readonly longitude: number;
            readonly latitude: number;
            readonly address: string;
        } | null;

        readonly tasteProfile: {
            readonly attributeCategories:
                readonly HomeAttributeCategoryResponse[];
        };

        readonly personalRecommendationHistory: {
            readonly items: readonly {
                readonly id: number;
                readonly createdAt: string;
                readonly selectedMenu: {
                    readonly name: string;
                    readonly attributeCategories:
                        readonly HomeAttributeCategoryResponse[];
                };
            }[];
        };

        readonly recentGroupActivities: {
            readonly items: readonly {
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
            }[];
        };
    };

    readonly error: {
        readonly status: number;
        readonly code: string;
        readonly message: string;
        readonly details: readonly unknown[];
    } | null;
}