import type { GroupDetail } from "@/features/group/domain/model/GroupDetail";

export type GroupDetailState =
    | { readonly status: "LOADING" }
    | { readonly status: "SUCCESS"; readonly data: GroupDetail }
    | { readonly status: "ERROR"; readonly message: string };