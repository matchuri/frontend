"use client";

import { useEffect } from "react";
import { useAtomValue } from "jotai";
import {
    useRouter,
    useSearchParams,
} from "next/navigation";

import { guestRecommendationDataAtom } from "@/features/guestRecommendation/application/selectors/guestRecommendationSelectors";
import { guestLocationAtom } from "@/features/guestRecommendation/application/selectors/guestRecommendationSettingSelectors";

export function useGuestRecommendationRestaurantContext() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const recommendation = useAtomValue(guestRecommendationDataAtom);
    const location =useAtomValue(guestLocationAtom);

    const source = searchParams.get("source");
    const menuId = Number(searchParams.get("menuId"));

    const selectedMenu =
        recommendation?.candidates.find(
            (candidate) => candidate.menuId === menuId,
        ) ?? null;

    const isValidContext =
        source === "guest" &&
        Number.isInteger(menuId) &&
        menuId > 0 &&
        selectedMenu !== null;

    useEffect(() => {
        if (isValidContext) {
            return;
        }

        router.replace("/guest-recommendation");
    }, [
        isValidContext,
        router,
    ]);

    const moveToResult = () => {
        router.push("/guest-recommendation/result");
    };

    return {
        location,
        selectedMenu,
        isValidContext,
        moveToResult,
    };
}