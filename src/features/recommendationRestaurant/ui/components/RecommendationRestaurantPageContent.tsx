"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import RecommendationRestaurantCard from "@/features/recommendationRestaurant/ui/components/RecommendationRestaurantCard";
import RecommendationRestaurantMapPlaceholder from "@/features/recommendationRestaurant/ui/components/RecommendationRestaurantMapPlaceholder";
import { mockRecommendationRestaurants } from "@/features/recommendationRestaurant/ui/mock/mockRecommendationRestaurants";

import { recommendationRestaurantPageStyles } from "@/ui/styles/recommendationRestaurantPageStyles";

export default function RecommendationRestaurantPageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const menuName = searchParams.get("menuName") ?? "추천 메뉴";
    const latitude = Number(searchParams.get("latitude") ?? 37.4979);
    const longitude = Number(searchParams.get("longitude") ?? 127.0276);
    const level = Number(searchParams.get("level") ?? 4);

    const source = searchParams.get("source") ?? "personal";
    const isGroupRecommendation = source === "group";

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

                <div className={recommendationRestaurantPageStyles.restaurantList}>
                    {mockRecommendationRestaurants.map((restaurant) => (
                        <RecommendationRestaurantCard
                            key={restaurant.id}
                            restaurant={restaurant}
                        />
                    ))}
                </div>
            </section>

            <RecommendationRestaurantMapPlaceholder
                latitude={latitude}
                longitude={longitude}
                level={level}
                restaurants={mockRecommendationRestaurants}
            />
        </main>
    );
}