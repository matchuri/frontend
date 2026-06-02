import { atom } from "jotai";

import { inviteAtom } from "@/features/group/application/atoms/inviteAtom";

export const invitesAtom = atom((get) => {
    const inviteState = get(inviteAtom);
    return inviteState.status === "SUCCESS" ? inviteState.data : [];
});

export const hasInvitesAtom = atom((get) => get(invitesAtom).length > 0);

export const inviteCountAtom = atom((get) => get(invitesAtom).length);

export const isInviteListLoadingAtom = atom(
    (get) => get(inviteAtom).status === "LOADING",
);

export const inviteListErrorMessageAtom = atom((get) => {
    const inviteState = get(inviteAtom);

    return inviteState.status === "ERROR" ? inviteState.message : null;
});

export const shouldShowInviteViewAllButtonAtom = atom(
    (get) => get(inviteCountAtom) >= 3,
);