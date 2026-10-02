import type { UserPreference } from "@/features/preference/domain/model/UserPreference";

const KEY = "signup_taste_profile";

export const signupTasteProfileStorage = {
    save: (preference: UserPreference) => {
        if (typeof window === "undefined") {
            return;
        }

        window.sessionStorage.setItem(
            KEY,
            JSON.stringify(preference),
        );
    },

    load: (): UserPreference | null => {
        if (typeof window === "undefined") {
            return null;
        }

        const data = window.sessionStorage.getItem(KEY);

        return data
            ? JSON.parse(data) as UserPreference
            : null;
    },

    clear: () => {
        if (typeof window === "undefined") {
            return;
        }

        window.sessionStorage.removeItem(KEY);
    },
};