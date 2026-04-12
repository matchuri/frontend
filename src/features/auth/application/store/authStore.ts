import { getDefaultStore } from "jotai";
import { authAtom } from "@/features/auth/application/atom/authAtom";

const store = getDefaultStore();

export function getAccessToken(): string | null {
    const state = store.get(authAtom);

    if (state.status === "AUTHENTICATED") {
        return state.accessToken;
    }

    return null;
}

export function setLoading() {
    store.set(authAtom, {
        status: "LOADING",
    });
}

export function setAuthenticated(accessToken: string) {
    store.set(authAtom, {
        status: "AUTHENTICATED",
        accessToken,
    });
}

export function clearAuth() {
    store.set(authAtom, {
        status: "UNAUTHENTICATED",
    });
}