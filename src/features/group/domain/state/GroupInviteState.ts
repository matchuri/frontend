import type { GroupInvite } from "@/features/group/domain/model/GroupInvite";

export type GroupInviteState =
    | { readonly status: "LOADING" }
    | { readonly status: "SUCCESS"; readonly data: readonly GroupInvite[] }
    | { readonly status: "ERROR"; readonly message: string };