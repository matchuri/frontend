import { httpClient } from "@/infrastructure/http/httpClient";
import type { OnboardingState } from "@/features/auth/domain/model/Onboarding";
import type { SettingsProfile } from "@/features/settings/domain/model/SettingsProfile";

interface ApiErrorDetail {
    readonly source: string;
    readonly field: string;
    readonly reason: string;
}

interface ApiError {
    readonly status: number;
    readonly code: string;
    readonly message: string;
    readonly details: readonly ApiErrorDetail[];
}

interface MemberMeResponse {
    readonly success: boolean;
    readonly data: SettingsProfile;
    readonly error: ApiError | null;
}

interface UpdateNicknameData {
    readonly id: number;
    readonly updatedAt: string;
    readonly onboarding: OnboardingState;
}

interface UpdateNicknameResponse {
    readonly success: boolean;
    readonly data: UpdateNicknameData;
    readonly error: ApiError | null;
}

export async function fetchSettingsProfile(): Promise<SettingsProfile> {
    const response = await httpClient.get<MemberMeResponse>("/api/v1/members/me");

    if (!response.success) {
        throw new Error(
            response.error?.message || "회원 정보를 불러오지 못했습니다.",
        );
    }

    return response.data;
}

export async function updateNickname(
    nickname: string,
): Promise<UpdateNicknameData> {
    const response = await httpClient.patch<UpdateNicknameResponse>(
        "/api/v1/members/me",
        {
            nickname,
        },
    );

    if (!response.success) {
        throw new Error(
            response.error?.message || "닉네임 변경에 실패했습니다.",
        );
    }

    return response.data;
}