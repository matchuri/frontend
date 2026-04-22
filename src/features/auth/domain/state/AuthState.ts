export type AuthState =
    | { readonly status: "LOADING" } // 로그인 시작
    | { readonly status: "UNAUTHENTICATED" } // 실패
    | {
          readonly status: "AUTHENTICATED"; // 성공
          readonly accessToken: string;
      };

/**
 * 추후 소셜 회원가입 분기 필요 시 예시:
 * | {
 *     readonly status: "SIGNUP_REQUIRED";
 *     readonly tempToken: string;
 *     readonly provider: AuthProvider;
 *   }
 */