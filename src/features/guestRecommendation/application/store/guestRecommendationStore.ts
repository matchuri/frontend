import { jotaiStore } from "@/shared/lib/jotaiStore";

import { guestRecommendationAtom } from "@/features/guestRecommendation/application/atoms/guestRecommendationAtom";
import type { GuestRecommendation } from "@/features/guestRecommendation/domain/model/GuestRecommendation";

export function setGuestRecommendationLoading() {
    jotaiStore.set(guestRecommendationAtom, {
        status: "LOADING",
    });
}

export function setGuestRecommendationSuccess(
    recommendation: GuestRecommendation,
) {
    jotaiStore.set(guestRecommendationAtom, {
        status: "SUCCESS",
        data: recommendation,
    });
}

export function setGuestRecommendationError(message: string) {
    jotaiStore.set(guestRecommendationAtom, {
        status: "ERROR",
        message,
    });
}

export function resetGuestRecommendation() {
    jotaiStore.set(guestRecommendationAtom, {
        status: "IDLE",
    });
}