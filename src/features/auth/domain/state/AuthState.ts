import type { OnboardingState } from "@/features/auth/domain/model/Onboarding";

export type AuthState =
    | { readonly status: "LOADING" } // 로그인 시작
    | { readonly status: "UNAUTHENTICATED" } // 실패
    | {
          readonly status: "AUTHENTICATED"; // 성공
          readonly accessToken: string;
          readonly onboarding: OnboardingState;
      };