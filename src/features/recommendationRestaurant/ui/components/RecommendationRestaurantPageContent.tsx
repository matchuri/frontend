"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import RecommendationRestaurantCard from "@/features/recommendationRestaurant/ui/components/RecommendationRestaurantCard";
import RecommendationRestaurantMap from "@/features/recommendationRestaurant/ui/components/RecommendationRestaurantMap";
import { useRecommendationRestaurants } from "@/features/recommendationRestaurant/application/hooks/useRecommendationRestaurants";

import { recommendationRestaurantPageStyles } from "@/ui/styles/recommendationRestaurantPageStyles";

export default function RecommendationRestaurantPageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const menuName = searchParams.get("menuName") ?? "추천 메뉴";
    const latitude = Number(searchParams.get("latitude"));
    const longitude = Number(searchParams.get("longitude"));
    const level = Number(searchParams.get("level") ?? 4);

    const source = searchParams.get("source") ?? "personal";
    const isGroupRecommendation = source === "group";

    const {
        restaurants,
        selectedRestaurant,
        selectedRestaurantId,
        isLoading,
        errorMessage,
        selectRestaurant,
    } = useRecommendationRestaurants({
        menuName,
        latitude,
        longitude,
    });

    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
        return (
            <main className={recommendationRestaurantPageStyles.container}>
                <section className={recommendationRestaurantPageStyles.listSection}>
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className={recommendationRestaurantPageStyles.backButton}
                    >
                        <ArrowLeft size={30} strokeWidth={2.5} />
                    </button>

                    <div className={recommendationRestaurantPageStyles.messageBox}>
                        위치 정보가 없어 맛집을 조회할 수 없습니다.
                    </div>
                </section>
            </main>
        );
    }

    return (
        <main className={recommendationRestaurantPageStyles.container}>
            <section className={recommendationRestaurantPageStyles.listSection}>
                <button
                    type="button"
                    onClick={() => router.back()}
                    className={recommendationRestaurantPageStyles.backButton}
                >
                    <ArrowLeft size={26} />
                </button>

                <div className={recommendationRestaurantPageStyles.titleSection}>
                    <h1 className={recommendationRestaurantPageStyles.title}>
                        {isGroupRecommendation
                            ? "투표 결과"
                            : `${menuName} 맛집`}
                    </h1>

                    {isGroupRecommendation && (
                        <p className={recommendationRestaurantPageStyles.selectedMenuText}>
                            선정 메뉴: {menuName}
                        </p>
                    )}
                </div>

                {isLoading && (
                    <div className={recommendationRestaurantPageStyles.messageBox}>
                        주변 맛집을 불러오는 중...
                    </div>
                )}

                {errorMessage && (
                    <div className={recommendationRestaurantPageStyles.errorBox}>
                        {errorMessage}
                    </div>
                )}

                {!isLoading && !errorMessage && restaurants.length === 0 && (
                    <div className={recommendationRestaurantPageStyles.messageBox}>
                        주변 맛집을 찾지 못했습니다.
                    </div>
                )}

                {!isLoading && !errorMessage && restaurants.length > 0 && (
                    <div className={recommendationRestaurantPageStyles.restaurantList}>
                        {restaurants.map((restaurant) => (
                            <RecommendationRestaurantCard
                                key={restaurant.id}
                                restaurant={restaurant}
                                selected={restaurant.id === selectedRestaurantId}
                                onClick={() => selectRestaurant(restaurant.id)}
                            />
                        ))}
                    </div>
                )}
            </section>

            <RecommendationRestaurantMap
                latitude={latitude}
                longitude={longitude}
                level={level}
                restaurants={restaurants}
                selectedRestaurant={selectedRestaurant}
                onSelectRestaurant={selectRestaurant}
            />
        </main>
    );
}