import type { OnboardingNextStep } from "@/features/auth/domain/model/Onboarding";

import { getOnboardingRoute } from "@/features/auth/application/onboarding/getOnboardingRoute";
import { groupInviteSessionStorage } from "@/features/group/infrastructure/storage/groupInviteSessionStorage";

export function getPostAuthenticationRoute(
    nextStep: OnboardingNextStep,
) {
    if (nextStep !== "READY") {
        return getOnboardingRoute(nextStep);
    }

    const inviteCode =
        groupInviteSessionStorage.getCode();

    if (inviteCode) {
        return `/group/invite-links/preview?code=${encodeURIComponent(inviteCode)}`;
    }

    return getOnboardingRoute(nextStep);
}