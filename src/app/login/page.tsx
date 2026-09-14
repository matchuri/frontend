"use client";

import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

import { authPageStyles } from "@/ui/styles/authPageStyles";
import SocialLoginButton from "@/features/auth/ui/components/SocialLoginButton";
import type { AuthProvider } from "@/features/auth/domain/model/AuthProvider";
import { useLogin } from "@/features/auth/application/hooks/useLogin";
import {
    isAuthenticatedAtom,
    isAuthLoadingAtom,
} from "@/features/auth/application/selectors/authSelectors";
import AuthPageHeader from "@/ui/components/AuthPageHeader";
import AuthPageSkeleton from "@/features/auth/ui/components/AuthPageSkeleton";

const providers: AuthProvider[] = ["GOOGLE", "KAKAO", "NAVER"];

export default function LoginPage() {
    const router = useRouter();
    const isAuthenticated = useAtomValue(isAuthenticatedAtom);
    const isAuthLoading = useAtomValue(isAuthLoadingAtom);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const {
        loginId,
        setLoginId,
        password,
        setPassword,
        errorMessage,
        captchaStatusMessage,
        isSubmitting,
        isValid,
        submit,
    } = useLogin();

    useEffect(() => {
        if (!isAuthLoading && isAuthenticated) {
            router.replace("/home");
        }
    }, [isAuthLoading, isAuthenticated, router]);

    if (isAuthLoading) {
        return <AuthPageSkeleton variant="LOGIN" />;
    }

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
                        submit();
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
                            onChange={(event) => setLoginId(event.target.value)}
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
                                onChange={(event) => setPassword(event.target.value)}
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