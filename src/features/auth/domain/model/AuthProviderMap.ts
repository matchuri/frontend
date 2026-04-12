import type { AuthProvider } from "./AuthProvider";

export const AuthProviderMap: Record<string, AuthProvider> = {
    google: "GOOGLE",
    kakao: "KAKAO",
    naver: "NAVER",
} as const;