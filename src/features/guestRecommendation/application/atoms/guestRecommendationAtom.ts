import { atom } from "jotai";

import type { GuestRecommendationState } from "@/features/guestRecommendation/domain/state/GuestRecommendationState";

export const guestRecommendationAtom =
    atom<GuestRecommendationState>({
        status: "IDLE",
    });