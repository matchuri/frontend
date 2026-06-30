import { atom } from "jotai";
import { authAtom } from "@/features/auth/application/atom/authAtom";

export const authStatusAtom = atom((get) => get(authAtom).status);

export const isAuthLoadingAtom = atom(
    (get) => get(authAtom).status === "LOADING",
);

export const isAuthenticatedAtom = atom(
    (get) => get(authAtom).status === "AUTHENTICATED",
);

export const accessTokenAtom = atom((get) => {
    const auth = get(authAtom);
    return auth.status === "AUTHENTICATED" ? auth.accessToken : null;
});

export const onboardingAtom = atom((get) => {
    const auth = get(authAtom);
    return auth.status === "AUTHENTICATED" ? auth.onboarding : null;
});

export const isOnboardingReadyAtom = atom((get) => {
    const auth = get(authAtom);

    return (
        auth.status === "AUTHENTICATED" &&
        auth.onboarding.nextStep === "READY"
    );
});

export const memberAtom = atom((get) => {
    const auth = get(authAtom);
    return auth.status === "AUTHENTICATED" ? auth.member : null;
});