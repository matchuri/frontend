import type { LoginType } from "@/features/settings/domain/model/LoginType";

export interface SettingsProfile {
    readonly nickname: string;
    readonly loginType: LoginType;
    readonly userId?: string;
}