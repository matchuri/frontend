const PASSWORD_MIN = 8;
const PASSWORD_MAX = 100;

const PASSWORD_REGEX =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/;

const WHITESPACE_REGEX = /\s/;

type ValidateResetPasswordResult =
    | { readonly success: true }
    | { readonly success: false; readonly message: string };

export function validateResetPassword(
    password: string,
): ValidateResetPasswordResult {
    if (!password) {
        return {
            success: false,
            message: "",
        };
    }

    if (WHITESPACE_REGEX.test(password)) {
        return {
            success: false,
            message: "비밀번호에는 공백을 사용할 수 없습니다.",
        };
    }

    if (password.length < PASSWORD_MIN || password.length > PASSWORD_MAX) {
        return {
            success: false,
            message: "비밀번호는 8자 이상 100자 이하로 입력해주세요.",
        };
    }

    if (!PASSWORD_REGEX.test(password)) {
        return {
            success: false,
            message: "비밀번호는 문자, 숫자, 특수문자를 각각 1개 이상 포함해야 합니다.",
        };
    }

    return {
        success: true,
    };
}