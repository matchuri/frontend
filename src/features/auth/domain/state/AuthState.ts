export type AuthState =
    | { readonly status: "LOADING" } // 로그인 시작
    | { readonly status: "UNAUTHENTICATED" } // 실패
    | {
          readonly status: "AUTHENTICATED"; // 성공
          readonly accessToken: string;
      };