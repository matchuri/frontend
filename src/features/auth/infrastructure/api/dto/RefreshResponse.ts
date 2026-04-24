import type { ApiResponse } from "@/features/auth/domain/model/ApiResponse";
import type { OnboardingState } from "@/features/auth/domain/model/Onboarding";

export interface RefreshData {
    accessToken: string;
    onboarding: OnboardingState;
}

export type RefreshResponse = ApiResponse<RefreshData>;