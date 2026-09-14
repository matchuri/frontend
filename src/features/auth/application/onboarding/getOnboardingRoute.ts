import type { OnboardingNextStep } from "@/features/auth/domain/model/Onboarding";

const ONBOARDING_ROUTE_MAP: Record<OnboardingNextStep, string> = {
    REQUIRED_AGREEMENTS: "/terms",
    REQUIRED_NICKNAME: "/signup/nickname",
    REQUIRED_TASTE_PROFILE: "/signup/preference",
    READY: "/home",
};

export function getOnboardingRoute(nextStep: OnboardingNextStep): string {
    return ONBOARDING_ROUTE_MAP[nextStep];
}