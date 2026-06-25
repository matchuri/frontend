import { atom } from "jotai";

import type { GroupRecommendationReadinessState } from "@/features/groupRecommendation/domain/state/GroupRecommendationReadinessState";

export const groupRecommendationReadinessAtom =
    atom<GroupRecommendationReadinessState>({
        status: "LOADING",
    });