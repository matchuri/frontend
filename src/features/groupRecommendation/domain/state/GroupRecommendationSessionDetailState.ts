import type { GroupRecommendationSessionDetail } from "@/features/groupRecommendation/domain/model/GroupRecommendationSessionDetail";

export type GroupRecommendationSessionDetailState =
    | { readonly status: "LOADING" }
    | { readonly status: "SUCCESS"; readonly data: GroupRecommendationSessionDetail }
    | { readonly status: "ERROR"; readonly message: string };