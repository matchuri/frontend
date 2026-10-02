import type { SignupOnboardingMode } from "@/features/signup/domain/model/SignupOnboardingMode";

const KEY = "signup_onboarding_mode";

export const signupOnboardingModeStorage = {
    save: (mode: SignupOnboardingMode) => {
        if (typeof window === "undefined") {
            return;
        }

        window.sessionStorage.setItem(KEY, mode);
    },

    load: (): SignupOnboardingMode | null => {
        if (typeof window === "undefined") {
            return null;
        }

        return window.sessionStorage.getItem(KEY) as SignupOnboardingMode | null;
    },

    clear: () => {
        if (typeof window === "undefined") {
            return;
        }

        window.sessionStorage.removeItem(KEY);
    },
};