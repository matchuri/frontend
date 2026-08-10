import type { SettingsProfile } from "@/features/settings/domain/model/SettingsProfile";

export type SettingsState =
    | { readonly status: "IDLE" }
    | { readonly status: "LOADING"; readonly data?: SettingsProfile }
    | { readonly status: "SUCCESS"; readonly data: SettingsProfile }
    | { readonly status: "ERROR"; readonly message: string; readonly data?: SettingsProfile };