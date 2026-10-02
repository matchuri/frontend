const KEY = "signup_account";

export interface AccountData {
    id: string;
    password: string;
    email: string;
    emailVerificationToken: string;
    isSocial?: boolean;
}

export const accountStorage = {
    save: (data: AccountData) => {
        if (typeof window === "undefined") {
            return;
        }

        window.sessionStorage.setItem(KEY, JSON.stringify(data));
    },

    load: (): AccountData | null => {
        if (typeof window === "undefined") {
            return null;
        }

        const data = window.sessionStorage.getItem(KEY);
        return data ? JSON.parse(data) : null;
    },

    clear: () => {
        if (typeof window === "undefined") {
            return;
        }

        window.sessionStorage.removeItem(KEY);
    },
};