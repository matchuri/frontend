import type { Group } from "@/features/group/domain/model/Group";

export type GroupListState =
    | { readonly status: "LOADING" }
    | { readonly status: "SUCCESS"; readonly data: readonly Group[] }
    | { readonly status: "ERROR"; readonly message: string };