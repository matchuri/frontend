"use client";

import { useEffect } from "react";
import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { loginPageStyles } from "@/ui/styles/loginPageStyles";
import SocialLoginButton from "@/features/auth/ui/components/SocialLoginButton";
import type { AuthProvider } from "@/features/auth/domain/model/AuthProvider";
import { useLogin } from "@/features/auth/application/hooks/useLogin";
import {
    isAuthenticatedAtom,
    isAuthLoadingAtom,
} from "@/features/auth/application/selectors/authSelectors";
import HomeNavigationButton from "@/ui/components/HomeNavigationButton";

const providers: AuthProvider[] = ["GOOGLE", "KAKAO", "NAVER"];

export default function LoginPage() {
    const router = useRouter();
    const isAuthenticated = useAtomValue(isAuthenticatedAtom);
    const isAuthLoading = useAtomValue(isAuthLoadingAtom);

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
        return (
            <div className="flex h-screen items-center justify-center">
                <p>인증 상태 확인 중...</p>
            </div>
        );
    }

    return (
        <div className={loginPageStyles.container}>
            <HomeNavigationButton />

            <div className={loginPageStyles.card}>
                <div className="flex w-full flex-col gap-1">
                    <h1 className={loginPageStyles.title}>로그인</h1>
                </div>

                <form
                    className={loginPageStyles.formGroup}
                    onSubmit={(event) => {
                        event.preventDefault();
                        submit();
                    }}
                >
                    <div className={loginPageStyles.inputGroup}>
                        <label htmlFor="login-id" className={loginPageStyles.label}>
                            아이디
                        </label>
                        <input
                            id="login-id"
                            type="text"
                            autoComplete="username"
                            value={loginId}
                            onChange={(event) => setLoginId(event.target.value)}
                            className={loginPageStyles.input}
                        />
                    </div>

                    <div className={loginPageStyles.inputGroup}>
                        <label
                            htmlFor="login-password"
                            className={loginPageStyles.label}
                        >
                            비밀번호
                        </label>
                        <input
                            id="login-password"
                            type="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            className={loginPageStyles.input}
                        />
                    </div>

                    {captchaStatusMessage && (
                        <p className="text-sm text-gray-500" aria-live="polite">
                            {captchaStatusMessage}
                        </p>
                    )}

                    {errorMessage && (
                        <p role="alert" className="text-sm text-red-500">
                            {errorMessage}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={!isValid || isSubmitting}
                        className={loginPageStyles.loginButton}
                    >
                        {isSubmitting ? "로그인 중..." : "로그인"}
                    </button>
                </form>

                <div className={loginPageStyles.divider}>
                    <div className={loginPageStyles.dividerLine} />
                    <span>또는</span>
                    <div className={loginPageStyles.dividerLine} />
                </div>

                <div className={loginPageStyles.buttonGroup}>
                    {providers.map((provider) => (
                        <SocialLoginButton key={provider} provider={provider} />
                    ))}
                </div>

                <div className={loginPageStyles.helperLinks}>
                    <Link href="/auth/find-id" className={loginPageStyles.helperLink}>
                        아이디 찾기
                    </Link>
                    <span className={loginPageStyles.separator}>|</span>
                    <Link
                        href="/auth/find-password"
                        className={loginPageStyles.helperLink}
                    >
                        비밀번호 찾기
                    </Link>
                    <span className={loginPageStyles.separator}>|</span>
                    <Link href="/signup" className={loginPageStyles.signupLink}>
                        회원가입
                    </Link>
                </div>
            </div>
        </div>
    );
}