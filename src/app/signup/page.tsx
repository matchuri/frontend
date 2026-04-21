"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { signupPageStyles } from "@/ui/styles/signupPageStyles";
import type { AuthProvider } from "@/features/auth/domain/model/AuthProvider";
import SocialLoginButton from "@/features/auth/ui/components/SocialLoginButton";
import { accountStorage } from "@/features/auth/infrastructure/storage/accountStorage";

const providers: AuthProvider[] = ["GOOGLE", "KAKAO", "NAVER"];

export default function SignupPage() {
  const router = useRouter();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  // 아이디 + 비밀번호 둘 다 입력되었을 때만 활성화
  const canSubmit =
    id.trim().length > 0 &&
    password.trim().length > 0;

  const handleSubmit = () => {
    if (!canSubmit) return;

    // 일반 회원가입 페이지 진입 시 isSocial = false
    accountStorage.save({
      id: id.trim(),
      password: password.trim(),
      isSocial: false,
    });

    router.push("/terms");
  };

  return (
    <div className={signupPageStyles.container}>
      {/* TODO: 로고 아이콘으로 변경 필요 */}
      <div className="absolute top-20 flex items-center gap-2 text-2xl font-semibold text-black">
        <span>Matchuri</span>
      </div>

      <div className={signupPageStyles.card}>
        {/* 타이틀 영역 */}
        <div className="flex flex-col gap-1 w-full">
          <h1 className={signupPageStyles.title}>계정 만들기</h1>
        </div>

        {/* 소셜 로그인 버튼 */}
        <div className={signupPageStyles.socialGroup}>
          {providers.map((provider) => (
            <SocialLoginButton key={provider} provider={provider} />
          ))}
        </div>

        {/* divider */}
        <div className={signupPageStyles.divider}>
          <div className={signupPageStyles.dividerLine}></div>
          <span>또는</span>
          <div className={signupPageStyles.dividerLine}></div>
        </div>

        {/* 입력 폼 */}
        <div className={signupPageStyles.formGroup}>
          {/* 아이디 */}
          <div className={signupPageStyles.inputGroup}>
            <label className={signupPageStyles.label}>아이디</label>
            <input
              type="text"
              className={signupPageStyles.input}
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>

          {/* 비밀번호 */}
          <div className={signupPageStyles.inputGroup}>
            <label className={signupPageStyles.label}>비밀번호</label>
            <input
              type="password"
              className={signupPageStyles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* 버튼 오른쪽 정렬 */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!canSubmit}
              className={
                canSubmit
                  ? signupPageStyles.nextButton
                  : `${signupPageStyles.nextButton} opacity-50 cursor-not-allowed`
              }
            >
              계속
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}