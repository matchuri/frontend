const KEY = "signup_nickname";

export const nicknameStorage = {
    save: (nickname: string) => {
        if (typeof window === "undefined") {
            return;
        }

        window.sessionStorage.setItem(KEY, nickname);
    },

    load: (): string | null => {
        if (typeof window === "undefined") {
            return null;
        }

        return window.sessionStorage.getItem(KEY);
    },

    clear: () => {
        if (typeof window === "undefined") {
            return;
        }

        window.sessionStorage.removeItem(KEY);
    },
};