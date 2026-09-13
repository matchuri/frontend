"use client";

import { useEffect, useRef } from "react";

import type { AuthProvider } from "@/features/auth/domain/model/AuthProvider";
import type { LoginIdValidationStatus } from "@/features/signup/domain/model/LoginIdValidationStatus";
import SocialLoginButton from "@/features/auth/ui/components/SocialLoginButton";

import { authPageStyles } from "@/ui/styles/authPageStyles";

interface SignupLoginIdStepProps {
    readonly loginId: string;
    readonly loginIdStatus: LoginIdValidationStatus;
    readonly loginIdMessage: string;
    readonly canUseLoginId: boolean;
    readonly providers: readonly AuthProvider[];
    readonly onLoginIdChange: (loginId: string) => void;
    readonly onSubmit: () => void;
}

export default function SignupLoginIdStep({
    loginId,
    loginIdStatus,
    loginIdMessage,
    canUseLoginId,
    providers,
    onLoginIdChange,
    onSubmit,
}: SignupLoginIdStepProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const input = inputRef.current;

        if (!input) {
            return;
        }

        if (
            loginIdStatus === "DUPLICATED" ||
            loginIdStatus === "INVALID" ||
            loginIdStatus === "ERROR"
        ) {
            input.setCustomValidity(loginIdMessage);
            return;
        }

        input.setCustomValidity("");
    }, [loginIdMessage, loginIdStatus]);

    return (
        <>
            <div className={authPageStyles.intro}>
                <h1 className={authPageStyles.title}>
                    아이디를 입력해 주세요
                </h1>

                <p className={authPageStyles.description}>
                    로그인할 때 사용할 아이디를 입력해 주세요.
                </p>
            </div>

            <form
                className={authPageStyles.form}
                onSubmit={(event) => {
                    event.preventDefault();

                    if (!canUseLoginId) {
                        return;
                    }

                    onSubmit();
                }}
            >
                <div className={authPageStyles.inputGroup}>
                    <label
                        htmlFor="signup-login-id"
                        className={authPageStyles.label}
                    >
                        아이디
                    </label>

                    <input
                        ref={inputRef}
                        id="signup-login-id"
                        type="text"
                        value={loginId}
                        onChange={(event) => onLoginIdChange(event.target.value)}
                        className={authPageStyles.input}
                        placeholder="아이디를 입력하세요"
                        autoComplete="username"
                        pattern="[A-Za-z0-9._-]{1,50}"
                        maxLength={50}
                        required
                        autoFocus
                    />
                </div>

                <button
                    type="submit"
                    disabled={
                        !loginId.trim() ||
                        loginIdStatus === "CHECKING"
                    }
                    className={authPageStyles.primaryButton}
                >
                    계속
                </button>
            </form>

            <div className={authPageStyles.divider}>
                <div className={authPageStyles.dividerLine} />
                <span>또는</span>
                <div className={authPageStyles.dividerLine} />
            </div>

            <div className={authPageStyles.socialGroup}>
                {providers.map((provider) => (
                    <SocialLoginButton
                        key={provider}
                        provider={provider}
                        variant="icon"
                    />
                ))}
            </div>
        </>
    );
}