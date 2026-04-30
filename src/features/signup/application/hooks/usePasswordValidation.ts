"use client";

import { useState } from "react";

const PASSWORD_MIN = 8;
const PASSWORD_MAX = 100;

export function usePasswordValidation() {
    const [password, setPassword] = useState("");

    const isPasswordValid =
        password.length >= PASSWORD_MIN && password.length <= PASSWORD_MAX;

    const message =
        password && !isPasswordValid
            ? "비밀번호는 8자 이상 100자 이하로 입력해주세요."
            : "";

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