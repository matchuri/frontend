"use client";

import { useEffect, useState } from "react";
import {
    ArrowLeft,
    Eye,
    EyeOff,
    LockKeyhole,
} from "lucide-react";
import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";

import { useAuthGuard } from "@/features/routeGuard/application/hooks/useAuthGuard";

import { settingsAtom } from "@/features/settings/application/atoms/settingsAtom";
import { isLocalLoginAtom } from "@/features/settings/application/selectors/settingsSelectors";

import { useSettingsProfile } from "@/features/settings/application/hooks/useSettingsProfile";
import { useChangePassword } from "@/features/settings/application/hooks/useChangePassword";

import { passwordChangePageStyles } from "@/ui/styles/passwordChangePageStyles";

export default function PasswordChangePage() {
    const router = useRouter();

    const { isAuthLoading, canAccess } = useAuthGuard();

    useSettingsProfile(canAccess);

    const settingsState = useAtomValue(settingsAtom);
    const isLocalLogin = useAtomValue(isLocalLoginAtom);

    const {
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
    } = useChangePassword();

    const [
        showCurrentPassword,
        setShowCurrentPassword,
    ] = useState(false);

    const [
        showNewPassword,
        setShowNewPassword,
    ] = useState(false);

    const [
        showConfirmPassword,
        setShowConfirmPassword,
    ] = useState(false);

    const isSettingsLoading =
        settingsState.status === "IDLE" ||
        settingsState.status === "LOADING";

    useEffect(() => {
        if (!canAccess || isSettingsLoading) {
            return;
        }

        if (!isLocalLogin) {
            router.replace("/settings");
        }
    }, [
        canAccess,
        isLocalLogin,
        isSettingsLoading,
        router,
    ]);

    if (
        isAuthLoading ||
        !canAccess ||
        isSettingsLoading ||
        !isLocalLogin
    ) {
        return null;
    }

    const handleClickBack = () => {
        router.push("/settings");
    };

    const handleSubmit = async () => {
        const isChanged = await submit();

        if (!isChanged) {
            return;
        }

        router.push("/settings");
    };

    return (
        <main className={passwordChangePageStyles.page}>
            <header className={passwordChangePageStyles.header}>
                <button
                    type="button"
                    onClick={handleClickBack}
                    className={passwordChangePageStyles.backButton}
                    aria-label="마이 페이지로 돌아가기"
                >
                    <ArrowLeft
                        size={22}
                        strokeWidth={2}
                        aria-hidden="true"
                    />
                </button>

                <h1 className={passwordChangePageStyles.title}>
                    비밀번호 변경
                </h1>

                <div
                    className={passwordChangePageStyles.headerSpacer}
                />
            </header>

            <div className={passwordChangePageStyles.content}>
                <section className={passwordChangePageStyles.introSection}>
                    <div className={passwordChangePageStyles.iconWrapper}>
                        <LockKeyhole
                            size={24}
                            strokeWidth={2}
                            aria-hidden="true"
                        />
                    </div>

                    <h2 className={passwordChangePageStyles.introTitle}>
                        새로운 비밀번호를 설정해주세요
                    </h2>

                    <p className={passwordChangePageStyles.introDescription}>
                        안전한 계정 사용을 위해 현재 비밀번호를 확인한 후
                        <br />
                        새로운 비밀번호를 입력해주세요.
                    </p>
                </section>

                <form
                    className={passwordChangePageStyles.form}
                    onSubmit={(event) => {
                        event.preventDefault();
                        handleSubmit();
                    }}
                >
                    <div className={passwordChangePageStyles.field}>
                        <label
                            htmlFor="current-password"
                            className={passwordChangePageStyles.label}
                        >
                            현재 비밀번호
                        </label>

                        <div className={passwordChangePageStyles.inputWrapper}>
                            <input
                                id="current-password"
                                type={showCurrentPassword ? "text" : "password"}
                                value={currentPassword}
                                onChange={(event) => setCurrentPassword(event.target.value)}
                                placeholder="현재 비밀번호를 입력해주세요"
                                autoComplete="current-password"
                                disabled={isSaving}
                                className={passwordChangePageStyles.input}
                            />

                            <button
                                type="button"
                                onClick={() => setShowCurrentPassword((prev) => !prev)}
                                disabled={isSaving}
                                className={passwordChangePageStyles.passwordToggleButton}
                                aria-label={showCurrentPassword ? "현재 비밀번호 숨기기" : "현재 비밀번호 보기"}
                            >
                                {showCurrentPassword ? (
                                    <EyeOff
                                        size={20}
                                        aria-hidden="true"
                                    />
                                ) : (
                                    <Eye
                                        size={20}
                                        aria-hidden="true"
                                    />
                                )}
                            </button>
                        </div>
                    </div>

                    <div className={passwordChangePageStyles.field}>
                        <label
                            htmlFor="new-password"
                            className={passwordChangePageStyles.label}
                        >
                            새 비밀번호
                        </label>

                        <div className={passwordChangePageStyles.inputWrapper}>
                            <input
                                id="new-password"
                                type={showNewPassword ? "text" : "password"}
                                value={newPassword}
                                onChange={(event) => setNewPassword(event.target.value)}
                                placeholder="새 비밀번호를 입력해주세요"
                                autoComplete="new-password"
                                disabled={isSaving}
                                className={passwordChangePageStyles.input}
                            />

                            <button
                                type="button"
                                onClick={() => setShowNewPassword((prev) => !prev)}
                                disabled={isSaving}
                                className={passwordChangePageStyles.passwordToggleButton}
                                aria-label={showNewPassword ? "새 비밀번호 숨기기" : "새 비밀번호 보기"}
                            >
                                {showNewPassword ? (
                                    <EyeOff
                                        size={20}
                                        aria-hidden="true"
                                    />
                                ) : (
                                    <Eye
                                        size={20}
                                        aria-hidden="true"
                                    />
                                )}
                            </button>
                        </div>

                        <p className={passwordChangePageStyles.helperText}>
                            문자, 숫자, 특수문자를 포함하여 8자 이상 입력해주세요.
                        </p>

                        {passwordMessage && (
                            <p className={passwordChangePageStyles.errorText}>
                                {passwordMessage}
                            </p>
                        )}
                    </div>

                    <div className={passwordChangePageStyles.field}>
                        <label
                            htmlFor="new-password-confirm"
                            className={passwordChangePageStyles.label}
                        >
                            새 비밀번호 확인
                        </label>

                        <div className={passwordChangePageStyles.inputWrapper}>
                            <input
                                id="new-password-confirm"
                                type={showConfirmPassword ? "text" : "password"}
                                value={newPasswordConfirm}
                                onChange={(event) => setNewPasswordConfirm(event.target.value)}
                                placeholder="새 비밀번호를 다시 입력해주세요"
                                autoComplete="new-password"
                                disabled={isSaving}
                                className={passwordChangePageStyles.input}
                            />

                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword((prev) => !prev)}
                                disabled={isSaving}
                                className={passwordChangePageStyles.passwordToggleButton}
                                aria-label={showConfirmPassword ? "새 비밀번호 확인 숨기기" : "새 비밀번호 확인 보기"}
                            >
                                {showConfirmPassword ? (
                                    <EyeOff
                                        size={20}
                                        aria-hidden="true"
                                    />
                                ) : (
                                    <Eye
                                        size={20}
                                        aria-hidden="true"
                                    />
                                )}
                            </button>
                        </div>

                        {confirmMessage && (
                            <p className={passwordChangePageStyles.errorText}>
                                {confirmMessage}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={!canChangePassword}
                        className={passwordChangePageStyles.submitButton}
                    >
                        {isSaving ? "변경 중..." : "비밀번호 변경"}
                    </button>
                </form>
            </div>
        </main>
    );
}