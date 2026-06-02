import { atom } from "jotai";
import type { GroupDetailState } from "@/features/group/domain/state/GroupDetailState";

export const groupDetailAtom = atom<GroupDetailState>({
    status: "LOADING",
});