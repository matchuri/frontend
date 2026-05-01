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
        sessionStorage.setItem(KEY, JSON.stringify(data));
    },

    load: (): AccountData | null => {
        const data = sessionStorage.getItem(KEY);
        return data ? JSON.parse(data) : null;
    },

    clear: () => {
        sessionStorage.removeItem(KEY);
    },
};