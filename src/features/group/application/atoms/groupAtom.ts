import { atom } from "jotai";
import type { GroupListState } from "@/features/group/domain/state/GroupListState";

export const groupAtom = atom<GroupListState>({
    status: "LOADING",
});