"use client";

import { useMemo, useState } from "react";
import { HttpError } from "@/infrastructure/http/httpClient";
import { changePassword } from "@/features/settings/infrastructure/api/settingsApi";

const PASSWORD_MIN = 8;
const PASSWORD_MAX = 100;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/;
const WHITESPACE_REGEX = /\s/;

function getPasswordMessage(password: string) {
    if (!password) return "";

    if (WHITESPACE_REGEX.test(password)) {
        return "비밀번호에는 공백을 사용할 수 없습니다.";
    }

    if (password.length < PASSWORD_MIN || password.length > PASSWORD_MAX) {
        return "비밀번호는 8자 이상 100자 이하로 입력해주세요.";
    }

    if (!PASSWORD_REGEX.test(password)) {
        return "비밀번호는 문자, 숫자, 특수문자를 각각 1개 이상 포함해야 합니다.";
    }

    return "";
}

function getChangePasswordErrorMessage(error: unknown) {
    if (error instanceof HttpError) {
        if (error.status === 401) {
            return "현재 비밀번호가 일치하지 않습니다.";
        }

        return "비밀번호 변경에 실패했습니다.";
    }

    return "비밀번호 변경에 실패했습니다.";
}

export function useChangePassword() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    const passwordMessage = getPasswordMessage(newPassword);
    const isNewPasswordValid = newPassword.length > 0 && !passwordMessage;
    const isPasswordMatched =
        newPasswordConfirm.length > 0 && newPassword === newPasswordConfirm;

    const confirmMessage = useMemo(() => {
        if (!newPasswordConfirm) return "";
        if (!isPasswordMatched) return "새 비밀번호가 일치하지 않습니다.";
        return "";
    }, [isPasswordMatched, newPasswordConfirm]);

    const canChangePassword =
        currentPassword.length > 0 &&
        isNewPasswordValid &&
        isPasswordMatched &&
        !isSaving;

    const submit = async () => {
        if (!canChangePassword) return;

        setIsSaving(true);

        try {
            await changePassword({
                currentPassword,
                newPassword,
            });

            alert("비밀번호가 변경되었습니다.");

            setCurrentPassword("");
            setNewPassword("");
            setNewPasswordConfirm("");
        } catch (error) {
            alert(getChangePasswordErrorMessage(error));
        } finally {
            setIsSaving(false);
        }
    };

    return {
        currentPassword,
        newPassword,
        newPasswordConfirm,
        passwordMessage,
        confirmMessage,
        isSaving,
        canChangePassword,
        setCurrentPassword,
        setNewPassword,
        setNewPasswordConfirm,
        submit,
    };
}