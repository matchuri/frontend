import { authAtom } from "@/features/auth/application/atom/authAtom";
import { jotaiStore } from "@/shared/lib/jotaiStore";
import type { OnboardingState } from "@/features/auth/domain/model/Onboarding";

export function setAuthLoading() {
    jotaiStore.set(authAtom, { status: "LOADING" });
}

export function setAuthenticated(
    accessToken: string,
    onboarding: OnboardingState,
) {
    jotaiStore.set(authAtom, {
        status: "AUTHENTICATED",
        accessToken,
        onboarding,
    });
}

export function updateOnboarding(onboarding: OnboardingState) {
    const auth = jotaiStore.get(authAtom);

    if (auth.status !== "AUTHENTICATED") return;

    jotaiStore.set(authAtom, {
        ...auth,
        onboarding,
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