import type { SettingsProfile } from "@/features/settings/domain/model/SettingsProfile";

export async function fetchSettingsProfile(): Promise<SettingsProfile> {
    // TODO: 추후 실제 API 연동
    return {
        nickname: "테스트",
        loginType: "LOCAL",
        userId: "test123",
    };
}