import type { PersonalRecommendation } from "@/features/personalRecommendation/domain/model/PersonalRecommendation";

export type PersonalRecommendationState =
    | { readonly status: "IDLE" }
    | { readonly status: "LOADING" }
    | {
          readonly status: "SUCCESS";
          readonly data: PersonalRecommendation;
      }
    | {
          readonly status: "ERROR";
          readonly message: string;
      };