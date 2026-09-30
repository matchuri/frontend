const GROUP_INVITE_CODE_KEY = "groupInviteCode";

export const groupInviteSessionStorage = {
    saveCode(code: string) {
        sessionStorage.setItem(
            GROUP_INVITE_CODE_KEY,
            code,
        );
    },

    getCode() {
        return sessionStorage.getItem(
            GROUP_INVITE_CODE_KEY,
        );
    },

    clearCode() {
        sessionStorage.removeItem(
            GROUP_INVITE_CODE_KEY,
        );
    },
};