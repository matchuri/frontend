import { authAtom } from "@/features/auth/application/atom/authAtom";
import { jotaiStore } from "@/shared/lib/jotaiStore";

export function setAuthLoading() {
    jotaiStore.set(authAtom, { status: "LOADING" });
}

export function setAuthenticated(accessToken: string) {
    jotaiStore.set(authAtom, {
        status: "AUTHENTICATED",
        accessToken,
    });
}

export function clearAuth() {
    jotaiStore.set(authAtom, { status: "UNAUTHENTICATED" });
}

export function getAccessToken(): string | null {
    const auth = jotaiStore.get(authAtom);

    if (auth.status === "AUTHENTICATED") {
        return auth.accessToken;
    }

    return null;
}