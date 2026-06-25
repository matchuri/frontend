import type { GroupRecommendationReadiness } from "@/features/groupRecommendation/domain/model/GroupRecommendationReadiness";

export type GroupRecommendationReadinessState =
    | { readonly status: "LOADING" }
    | { readonly status: "SUCCESS"; readonly data: GroupRecommendationReadiness }
    | { readonly status: "ERROR"; readonly message: string };