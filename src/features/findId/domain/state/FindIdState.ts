export type FindIdState =
    | { readonly status: "EMAIL_INPUT" }
    | { readonly status: "CODE_INPUT" }
    | { readonly status: "FOUND"; readonly loginId: string }
    | { readonly status: "NOT_FOUND"; readonly message: string }
    | { readonly status: "ERROR"; readonly message: string };