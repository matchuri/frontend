const KEY = "reset_password_account";

export interface ResetPasswordData {
    readonly loginId: string;
    readonly email: string;
    readonly emailVerificationToken: string;
}

export const resetPasswordStorage = {
    save: (data: ResetPasswordData) => {
        sessionStorage.setItem(KEY, JSON.stringify(data));
    },

    load: (): ResetPasswordData | null => {
        const data = sessionStorage.getItem(KEY);
        return data ? JSON.parse(data) : null;
    },

    clear: () => {
        sessionStorage.removeItem(KEY);
    },
};