import type { OnboardingState } from "@/features/auth/domain/model/Onboarding";
import type { LoginMember } from "@/features/auth/domain/model/LoginMember";

export type AuthState =
    | { readonly status: "LOADING" } // 로그인 시작
    | { readonly status: "UNAUTHENTICATED" } // 실패
    | {
          readonly status: "AUTHENTICATED"; // 성공
          readonly accessToken: string;
          readonly onboarding: OnboardingState;
          readonly member: LoginMember;
      };