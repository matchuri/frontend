import type { UserPreference } from "@/features/preference/domain/model/UserPreference";

export type PreferenceState =
    | { readonly status: "LOADING" }
    | { readonly status: "SUCCESS"; readonly data: UserPreference }
    | { readonly status: "ERROR"; readonly message: string };