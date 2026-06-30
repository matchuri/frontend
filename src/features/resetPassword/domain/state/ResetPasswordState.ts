export type ResetPasswordState =
    | { readonly status: "ACCOUNT_INPUT" }
    | { readonly status: "CODE_INPUT" }
    | { readonly status: "PASSWORD_INPUT" }
    | { readonly status: "COMPLETE" };