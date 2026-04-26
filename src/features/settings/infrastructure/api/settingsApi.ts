import { httpClient } from "@/infrastructure/http/httpClient";
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
    readonly error: ApiError;
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