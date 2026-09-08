import type { GuestRecommendation } from "@/features/guestRecommendation/domain/model/GuestRecommendation";

export type GuestRecommendationState =
    | { readonly status: "IDLE"; }
    | { readonly status: "LOADING"; }
    | {
          readonly status: "SUCCESS";
          readonly data: GuestRecommendation;
      }
    | {
          readonly status: "ERROR";
          readonly message: string;
      };