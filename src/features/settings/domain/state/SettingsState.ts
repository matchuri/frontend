import type { SettingsProfile } from "@/features/settings/domain/model/SettingsProfile";

export type SettingsState =
    | { readonly status: "LOADING" }
    | { readonly status: "SUCCESS"; readonly data: SettingsProfile }
    | { readonly status: "ERROR"; readonly message: string };