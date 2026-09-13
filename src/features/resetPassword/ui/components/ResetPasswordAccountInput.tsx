"use client";

import { useState } from "react";

import { authPageStyles } from "@/ui/styles/authPageStyles";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ResetPasswordAccountInputProps {
    readonly loginId: string;
    readonly email: string;
    readonly message: string | null;
    readonly isLoading: boolean;
    readonly canRequestVerification: boolean;
    readonly setLoginId: (loginId: string) => void;
    readonly setEmail: (email: string) => void;
    readonly handleRequestVerification: () => void;
}

export default function ResetPasswordAccountInput({
    loginId,
    email,
    message,
    isLoading,
    canRequestVerification,
    setLoginId,
    setEmail,
    handleRequestVerification,
}: ResetPasswordAccountInputProps) {
    const [emailError, setEmailError] = useState("");

    const handleEmailChange = (nextEmail: string) => {
        setEmail(nextEmail);

        if (emailError) {
            setEmailError("");
        }
    };

    const handleSubmit = () => {
        if (!EMAIL_REGEX.test(email.trim())) {
            setEmailError("올바른 이메일 형식이 아닙니다.");
            return;
        }

        setEmailError("");
        handleRequestVerification();
    };

    return (
        <div>
            <div className={authPageStyles.intro}>
                <h1 className={authPageStyles.title}>비밀번호 찾기</h1>

                <p className={authPageStyles.description}>
                    가입한 아이디와 이메일을 입력해 주세요.
                </p>
            </div>

            <form
                className={authPageStyles.form}
                onSubmit={(event) => {
                    event.preventDefault();

                    if (!canRequestVerification || isLoading) {
                        return;
                    }

                    handleSubmit();
                }}
            >
                <div className={authPageStyles.inputGroup}>
                    <label className={authPageStyles.label}>아이디</label>

                    <input
                        type="text"
                        value={loginId}
                        onChange={(event) => setLoginId(event.target.value)}
                        className={authPageStyles.input}
                        placeholder="아이디를 입력하세요"
                    />
                </div>

                <div className={authPageStyles.inputGroup}>
                    <label className={authPageStyles.label}>이메일</label>

                    <input
                        type="email"
                        value={email}
                        onChange={(event) => handleEmailChange(event.target.value)}
                        className={authPageStyles.input}
                        placeholder="이메일을 입력하세요"
                    />

                    {emailError && (
                        <p className={authPageStyles.message}>
                            {emailError}
                        </p>
                    )}
                </div>

                {message && (
                    <p className={authPageStyles.message}>{message}</p>
                )}

                <button
                    type="submit"
                    disabled={!canRequestVerification || isLoading}
                    className={authPageStyles.primaryButton}
                >
                    {isLoading ? "발송 중..." : "비밀번호 찾기"}
                </button>
            </form>
        </div>
    );
}