import { atom } from "jotai";
import type { GroupInviteState } from "@/features/group/domain/state/GroupInviteState";

export const inviteAtom = atom<GroupInviteState>({
    status: "LOADING",
});