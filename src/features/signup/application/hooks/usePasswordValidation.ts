"use client";

import { useState } from "react";

const PASSWORD_MIN = 8;
const PASSWORD_MAX = 100;

// 최소 1개 문자, 숫자, 특수문자 포함
const PASSWORD_REGEX =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/;

// 공백 체크
const WHITESPACE_REGEX = /\s/;

export function usePasswordValidation() {
    const [password, setPassword] = useState("");

    const isLengthValid =
        password.length >= PASSWORD_MIN &&
        password.length <= PASSWORD_MAX;

    const hasWhitespace = WHITESPACE_REGEX.test(password);

    const isFormatValid = PASSWORD_REGEX.test(password);

    const isPasswordValid = isLengthValid && isFormatValid && !hasWhitespace;

    const message = (() => {
        if (!password) return "";

        if (hasWhitespace) {
            return "비밀번호에는 공백을 사용할 수 없습니다.";
        }

        if (!isLengthValid) {
            return "비밀번호는 8자 이상 100자 이하로 입력해주세요.";
        }

        if (!isFormatValid) {
            return "비밀번호는 문자, 숫자, 특수문자를 각각 1개 이상 포함해야 합니다.";
        }

        return "";
    })();

    const handlePasswordChange = (nextPassword: string) => {
        setPassword(nextPassword);
    };

    return {
        password,
        isPasswordValid,
        message,
        handlePasswordChange,
    };
}