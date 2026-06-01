import { atom } from "jotai";

import type { PersonalRecommendationState } from "@/features/personalRecommendation/domain/state/PersonalRecommendationState";

export const personalRecommendationAtom =
    atom<PersonalRecommendationState>({
        status: "IDLE",
    });