import type { ApiResponse } from "@/features/auth/domain/model/ApiResponse";
import type { OnboardingState } from "@/features/auth/domain/model/Onboarding";

export interface SubmitAgreementsResponseData {
    readonly requiredAgreementsCompleted: boolean;
    readonly missingAgreementTypes: readonly string[];
    readonly onboarding: OnboardingState;
    readonly accessToken: string;
    readonly expiresIn: number;
}

export type SubmitAgreementsResponse = ApiResponse<SubmitAgreementsResponseData>;