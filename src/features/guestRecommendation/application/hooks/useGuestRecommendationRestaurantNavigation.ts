"use client";

import { useRouter } from "next/navigation";

export function useGuestRecommendationRestaurantNavigation() {
    const router = useRouter();

    const moveToRestaurants = (
        menuId: number,
    ) => {
        const searchParams =
            new URLSearchParams({
                source: "guest",
                menuId: String(menuId),
            });

        router.push(
            `/guest-recommendation/restaurants?${searchParams.toString()}`,
        );
    };

    return {
        moveToRestaurants,
    };
}