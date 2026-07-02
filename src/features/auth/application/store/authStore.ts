import { authAtom } from "@/features/auth/application/atom/authAtom";
import { jotaiStore } from "@/shared/lib/jotaiStore";

import { logger } from "@/shared/lib/logger";

import type { OnboardingState } from "@/features/auth/domain/model/Onboarding";
import type { LoginMember } from "@/features/auth/domain/model/LoginMember";

export function setAuthLoading() {
    jotaiStore.set(authAtom, { status: "LOADING" });
}

export function setAuthenticated(
    accessToken: string,
    onboarding: OnboardingState,
    member: LoginMember,
) {
    logger.log("[setAuthenticated]", { accessToken, onboarding, member });
    jotaiStore.set(authAtom, {
        status: "AUTHENTICATED",
        accessToken,
        onboarding,
        member,
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

export function updateMemberNickname(nickname: string) {
    const auth = jotaiStore.get(authAtom);

    if (auth.status !== "AUTHENTICATED") return;

    jotaiStore.set(authAtom, {
        ...auth,
        member: {
            ...auth.member,
            nickname,
        },
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