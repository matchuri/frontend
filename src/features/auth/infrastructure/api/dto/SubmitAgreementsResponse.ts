import type { ApiResponse } from "@/features/auth/domain/model/ApiResponse";
import type { OnboardingState } from "@/features/auth/domain/model/Onboarding";
import type { LoginMember } from "@/features/auth/domain/model/LoginMember";

export interface SubmitAgreementsResponseData {
    readonly requiredAgreementsCompleted: boolean;
    readonly missingAgreementTypes: readonly string[];
    readonly onboarding: OnboardingState;
    readonly accessToken: string;
    readonly expiresIn: number;
    readonly member: LoginMember;
}

export type SubmitAgreementsResponse = ApiResponse<SubmitAgreementsResponseData>;