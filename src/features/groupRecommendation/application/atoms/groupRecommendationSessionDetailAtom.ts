import { atom } from "jotai";

import type { GroupRecommendationSessionDetailState } from "@/features/groupRecommendation/domain/state/GroupRecommendationSessionDetailState";

export const groupRecommendationSessionDetailAtom =
    atom<GroupRecommendationSessionDetailState>({
        status: "LOADING",
    });