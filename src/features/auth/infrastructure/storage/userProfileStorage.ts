const KEY = "signup_profile";

export interface UserProfile {
    nickname: string;
    email?: string;
}

export const userProfileStorage = {
    save: (data: UserProfile) => {
        sessionStorage.setItem(KEY, JSON.stringify(data));
    },

    load: (): UserProfile | null => {
        const data = sessionStorage.getItem(KEY);
        return data ? JSON.parse(data) : null;
    },

    clear: () => {
        sessionStorage.removeItem(KEY);
    },
};