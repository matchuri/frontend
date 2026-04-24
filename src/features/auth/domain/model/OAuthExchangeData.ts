import type { OnboardingState } from "@/features/auth/domain/model/Onboarding";

// OAuth 로그인 성공 시 실제 데이터 내용
export interface OAuthExchangeData {
    readonly accessToken: string;
    readonly refreshToken: string | null;
    readonly expiresIn: number;
    readonly member: {
        readonly id: number;
        readonly role: string;
        readonly nickname: string;
    };
    readonly onboarding: OnboardingState;
}