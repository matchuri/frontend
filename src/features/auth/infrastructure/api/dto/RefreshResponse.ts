import type { ApiResponse } from "@/features/auth/domain/model/ApiResponse";
import type { OnboardingState } from "@/features/auth/domain/model/Onboarding";
import type { LoginMember } from "@/features/auth/domain/model/LoginMember";

export interface RefreshData {
    readonly accessToken: string;
    readonly refreshToken: string | null;
    readonly expiresIn: number;
    readonly onboarding: OnboardingState;
    readonly member: LoginMember;
}

export type RefreshResponse = ApiResponse<RefreshData>;