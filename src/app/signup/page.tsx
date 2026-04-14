"use client";

import { signupPageStyles } from "@/ui/styles/signupPageStyles";
import type { AuthProvider } from "@/features/auth/domain/model/AuthProvider";
import SocialLoginButton from "@/features/auth/ui/components/SocialLoginButton";
import { useRouter } from "next/navigation";

const providers: AuthProvider[] = ["GOOGLE", "KAKAO", "NAVER"];

export default function SignupPage() {
  const router = useRouter();

  const handleSubmit = () => {
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
            <input type="text" className={signupPageStyles.input} />
          </div>

          {/* 비밀번호 */}
          <div className={signupPageStyles.inputGroup}>
            <label className={signupPageStyles.label}>비밀번호</label>
            <input type="password" className={signupPageStyles.input} />
          </div>

          {/* 버튼 오른쪽 정렬 */}
          <div className="flex justify-end">
            <button
              className={signupPageStyles.nextButton}
              onClick={handleSubmit}
            >
              계속
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}