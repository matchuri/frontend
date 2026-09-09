"use client";

import { useEffect } from "react";
import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";

import {
    guestRecommendationDataAtom,
    guestRecommendationRankedCandidatesAtom,
} from "@/features/guestRecommendation/application/selectors/guestRecommendationSelectors";

export function useGuestRecommendationResult() {
    const router = useRouter();

    const recommendation = useAtomValue(guestRecommendationDataAtom);
    const candidates = useAtomValue(guestRecommendationRankedCandidatesAtom);

    useEffect(() => {
        if (recommendation !== null) {
            return;
        }

        router.replace("/guest-recommendation");
    }, [recommendation, router]);

    const moveToHome = () => {
        router.push("/");
    };

    return {
        recommendation,
        candidates,
        moveToHome,
    };
}