"use client";

import { authPageStyles } from "@/ui/styles/authPageStyles";

interface SignupEmailStepProps {
    readonly email: string;
    readonly isSending: boolean;
    readonly hasSentVerificationEmail: boolean;
    readonly canSendVerificationEmail: boolean;
    readonly onEmailChange: (email: string) => void;
    readonly onSubmit: () => void;
}

export default function SignupEmailStep({
    email,
    isSending,
    hasSentVerificationEmail,
    canSendVerificationEmail,
    onEmailChange,
    onSubmit,
}: SignupEmailStepProps) {
    return (
        <>
            <div className={authPageStyles.intro}>
                <h1 className={authPageStyles.title}>
                    이메일을 입력해 주세요
                </h1>

                <p className={authPageStyles.description}>
                    이메일 확인을 위해 인증번호를 보내드릴게요.
                </p>
            </div>

            <form
                className={authPageStyles.form}
                onSubmit={(event) => {
                    event.preventDefault();
                    onSubmit();
                }}
            >
                <div className={authPageStyles.inputGroup}>
                    <label
                        htmlFor="signup-email"
                        className={authPageStyles.label}
                    >
                        이메일
                    </label>

                    <input
                        id="signup-email"
                        type="email"
                        value={email}
                        onChange={(event) => onEmailChange(event.target.value)}
                        className={authPageStyles.input}
                        placeholder="이메일을 입력하세요"
                        autoComplete="email"
                        required
                        autoFocus
                    />
                </div>

                <button
                    type="submit"
                    disabled={
                        isSending ||
                        (
                            !hasSentVerificationEmail &&
                            !canSendVerificationEmail
                        )
                    }
                    className={authPageStyles.primaryButton}
                >
                    {isSending
                        ? "발송 중..."
                        : hasSentVerificationEmail
                          ? "계속"
                          : "인증번호 받기"}
                </button>
            </form>
        </>
    );
}