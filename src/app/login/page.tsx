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
    isSubmitting,
    isValid,
    submit,
  } = useLogin();

  useEffect(() => {
    if (!isAuthLoading && isAuthenticated) {
      router.replace("/home");
    }
  }, [isAuthLoading, isAuthenticated, router]);

  const handleSignupClick = () => {
    alert("준비 중인 기능입니다.");
  };

  if (isAuthLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>인증 상태 확인 중...</p>
      </div>
    );
  }

  return (
    <div className={loginPageStyles.container}>
      <div className={loginPageStyles.card}>
        <div className="flex w-full flex-col gap-1">
          <h1 className={loginPageStyles.title}>로그인</h1>
        </div>

        <div className={loginPageStyles.formGroup}>
          <div className={loginPageStyles.inputGroup}>
            <label className={loginPageStyles.label}>아이디</label>
            <input
              type="text"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
              className={loginPageStyles.input}
            />
          </div>

          <div className={loginPageStyles.inputGroup}>
            <label className={loginPageStyles.label}>비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={loginPageStyles.input}
            />
          </div>

          {errorMessage && (
            <p className="text-sm text-red-500">{errorMessage}</p>
          )}

          <button
            type="button"
            onClick={submit}
            disabled={!isValid || isSubmitting}
            className={loginPageStyles.loginButton}
          >
            {isSubmitting ? "로그인 중..." : "로그인"}
          </button>
        </div>

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
          <Link href="/" className={loginPageStyles.helperLink}>
            아이디 찾기
          </Link>
          <span className={loginPageStyles.separator}>|</span>
          <Link href="/" className={loginPageStyles.helperLink}>
            비밀번호 찾기
          </Link>
          <span className={loginPageStyles.separator}>|</span>
          <button
            type="button"
            onClick={handleSignupClick}
            className={loginPageStyles.signupLink}
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}