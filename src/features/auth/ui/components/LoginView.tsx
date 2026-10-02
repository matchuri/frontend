"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

import SocialLoginButton from "@/features/auth/ui/components/SocialLoginButton";
import type { AuthProvider } from "@/features/auth/domain/model/AuthProvider";

import AuthPageHeader from "@/ui/components/AuthPageHeader";

import { authPageStyles } from "@/ui/styles/authPageStyles";

const providers: AuthProvider[] = ["GOOGLE", "KAKAO", "NAVER"];

interface LoginViewProps {
    readonly loginId: string;
    readonly password: string;
    readonly errorMessage: string | null;
    readonly captchaStatusMessage: string | null;
    readonly isSubmitting: boolean;
    readonly isValid: boolean;
    readonly onLoginIdChange: (loginId: string) => void;
    readonly onPasswordChange: (password: string) => void;
    readonly onSubmit: () => void;
}

export default function LoginView({
    loginId,
    password,
    errorMessage,
    captchaStatusMessage,
    isSubmitting,
    isValid,
    onLoginIdChange,
    onPasswordChange,
    onSubmit,
}: LoginViewProps) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    return (
        <main className={authPageStyles.page}>
            <AuthPageHeader
                backHref="/"
                backLabel="홈으로 돌아가기"
            />

            <div className={authPageStyles.loginContent}>
                <div className={authPageStyles.loginIntro}>
                    <h1 className={authPageStyles.loginTitle}>로그인</h1>
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
                            htmlFor="login-id"
                            className={authPageStyles.label}
                        >
                            아이디
                        </label>

                        <input
                            id="login-id"
                            type="text"
                            autoComplete="username"
                            value={loginId}
                            onChange={(event) => onLoginIdChange(event.target.value)}
                            className={authPageStyles.input}
                            placeholder="아이디를 입력하세요"
                        />
                    </div>

                    <div className={authPageStyles.inputGroup}>
                        <label
                            htmlFor="login-password"
                            className={authPageStyles.label}
                        >
                            비밀번호
                        </label>

                        <div className={authPageStyles.passwordInputWrapper}>
                            <input
                                id="login-password"
                                type={isPasswordVisible ? "text" : "password"}
                                autoComplete="current-password"
                                value={password}
                                onChange={(event) => onPasswordChange(event.target.value)}
                                className={`${authPageStyles.input} ${authPageStyles.passwordInput}`}
                                placeholder="비밀번호를 입력하세요"
                            />

                            <button
                                type="button"
                                onClick={() => setIsPasswordVisible((prev) => !prev)}
                                className={authPageStyles.passwordToggle}
                                aria-label={isPasswordVisible ? "비밀번호 숨기기" : "비밀번호 보기"}
                            >
                                {isPasswordVisible ? (
                                    <EyeOff size={20} />
                                ) : (
                                    <Eye size={20} />
                                )}
                            </button>
                        </div>
                    </div>

                    {captchaStatusMessage && (
                        <p
                            className={authPageStyles.statusMessage}
                            aria-live="polite"
                        >
                            {captchaStatusMessage}
                        </p>
                    )}

                    {errorMessage && (
                        <p
                            role="alert"
                            className={authPageStyles.message}
                        >
                            {errorMessage}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={!isValid || isSubmitting}
                        className={authPageStyles.primaryButton}
                    >
                        {isSubmitting ? "로그인 중..." : "로그인"}
                    </button>
                </form>

                <div className={authPageStyles.signupGuide}>
                    <span>아직 회원이 아니신가요?</span>

                    <Link
                        href="/signup"
                        className={authPageStyles.signupLink}
                    >
                        회원가입
                    </Link>
                </div>

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

                <div className={authPageStyles.helperLinks}>
                    <Link
                        href="/auth/find-id"
                        className={authPageStyles.helperLink}
                    >
                        아이디 찾기
                    </Link>

                    <span className={authPageStyles.separator}>|</span>

                    <Link
                        href="/auth/find-password"
                        className={authPageStyles.helperLink}
                    >
                        비밀번호 찾기
                    </Link>
                </div>
            </div>
        </main>
    );
}