// 소셜 온보딩 중 닉네임 변경 API 응답 타입 정의
import type { ApiResponse } from "@/features/auth/domain/model/ApiResponse";
import type { OnboardingState } from "@/features/auth/domain/model/Onboarding";

export interface UpdateNicknameResponseData {
    readonly id: number;
    readonly updatedAt: string;
    readonly onboarding: OnboardingState;
}

export type UpdateNicknameResponse = ApiResponse<UpdateNicknameResponseData>;