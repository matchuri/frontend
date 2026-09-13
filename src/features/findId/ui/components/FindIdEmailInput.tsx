"use client";

import { useState } from "react";

import { authPageStyles } from "@/ui/styles/authPageStyles";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FindIdEmailInputProps {
    readonly email: string;
    readonly isLoading: boolean;
    readonly onEmailChange: (email: string) => void;
    readonly onSubmit: () => void;
}

export default function FindIdEmailInput({
    email,
    isLoading,
    onEmailChange,
    onSubmit,
}: FindIdEmailInputProps) {
    const [emailError, setEmailError] = useState("");
    const canSubmit = email.trim().length > 0 && !isLoading;

    const handleEmailChange = (nextEmail: string) => {
        onEmailChange(nextEmail);

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
        onSubmit();
    };

    return (
        <div>
            <div className={authPageStyles.intro}>
                <h1 className={authPageStyles.title}>아이디 찾기</h1>

                <p className={authPageStyles.description}>
                    가입한 이메일을 입력해 주세요.
                </p>
            </div>

            <form
                className={authPageStyles.form}
                onSubmit={(event) => {
                    event.preventDefault();

                    if (!canSubmit) {
                        return;
                    }

                    handleSubmit();
                }}
            >
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

                <button
                    type="submit"
                    disabled={!canSubmit}
                    className={authPageStyles.primaryButton}
                >
                    {isLoading ? "발송 중..." : "아이디 찾기"}
                </button>
            </form>
        </div>
    );
}