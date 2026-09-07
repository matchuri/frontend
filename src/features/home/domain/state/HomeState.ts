import type { HomeData } from "@/features/home/domain/model/Home";

export type HomeState =
    | { readonly status: "IDLE" }
    | { readonly status: "LOADING"; readonly data?: HomeData }
    | { readonly status: "SUCCESS"; readonly data: HomeData }
    | {
          readonly status: "ERROR";
          readonly message: string;
          readonly data?: HomeData;
      };