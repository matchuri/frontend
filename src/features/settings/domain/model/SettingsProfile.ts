export interface SettingsProfile {
    readonly id: number;
    readonly loginId: string | null;
    readonly nickname: string;
    readonly isSocial: boolean;
    readonly email: string;
    readonly profileImageUrl: string | null;
}