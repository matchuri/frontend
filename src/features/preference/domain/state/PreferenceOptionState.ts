import type { PreferenceOption } from "@/features/preference/domain/model/UserPreference";

export type PreferenceOptionState =
    | { readonly status: "LOADING" }
    | { readonly status: "SUCCESS"; readonly data: readonly PreferenceOption[] }
    | { readonly status: "ERROR"; readonly message: string };