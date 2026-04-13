import { authAtom } from "@/features/auth/application/atom/authAtom";
import { getDefaultStore } from "jotai";

const store = getDefaultStore();

export function getAccessToken(): string | null {
    const auth = store.get(authAtom);

    if (auth.status === "AUTHENTICATED") {
        return auth.accessToken;
    }

    return null;
}

export function setAccessToken(token: string) {
    store.set(authAtom, {
        status: "AUTHENTICATED",
        accessToken: token,
    });
}

export function clearAuthState() {
    store.set(authAtom, {
        status: "UNAUTHENTICATED",
    });
}