import type { HomeData } from "@/features/home/domain/model/Home";
import type { HomeResponse } from "@/features/home/infrastructure/api/dto/HomeResponse";

function formatRecommendationDate(
    createdAt: string,
) {
    return createdAt
        .slice(0, 10)
        .replaceAll("-", ".");
}

export function mapHomeResponse(
    data: HomeResponse["data"],
): HomeData {
    return {
        user: {
            nickname: data.user.nickname,
            profileImageUrl: data.user.profileImageUrl,
        },

        personalRecommendation: {
            latestRecommendationId: data.personalRecommendation.latestRecommendationId,
            latestRecommendationStatus: data.personalRecommendation.latestRecommendationStatus,
        },

        location: data.location
            ? {
                  longitude: data.location.longitude,
                  latitude: data.location.latitude,
                  address: data.location.address,
              }
            : null,

        tasteProfile: {
            attributes:
                data.tasteProfile.attributeCategories.map(
                    (category) => category.name,
                ),
        },

        personalRecommendationHistory:
            data.personalRecommendationHistory.items.map(
                (item) => ({
                    id: item.id,
                    menuName: item.selectedMenu.name,
                    recommendedDate:
                        formatRecommendationDate(
                            item.createdAt,
                        ),
                    categories:
                        item.selectedMenu.attributeCategories
                            .filter(
                                (category) => category.categoryType === "FOOD_CATEGORY"
                            )
                            .map(
                                (category) => category.name
                            ),
                }),
            ),

        recentGroupActivities:
            data.recentGroupActivities.items.map(
                (item) => ({
                    groupId: item.groupId,
                    groupName: item.groupName,
                    type: item.type,
                    details: {
                        recommendationId: item.details.recommendationId,
                        createdAt: item.details.createdAt,
                        startedAt: item.details.startedAt,
                        endedAt: item.details.endedAt,
                        selectedMenuName: item.details.selectedMenuName,
                    },
                }),
            ),
    };
}