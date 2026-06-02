import { atom } from "jotai";
import { inviteAtom } from "@/features/group/application/atoms/inviteAtom";

export const invitesAtom = atom((get) => {
    const state = get(inviteAtom);
    return state.status === "SUCCESS" ? state.data : [];
});

export const hasInvitesAtom = atom((get) => get(invitesAtom).length > 0);

export const inviteCountAtom = atom((get) => get(invitesAtom).length);

export const shouldShowInviteViewAllButtonAtom = atom(
    (get) => get(inviteCountAtom) >= 3,
);