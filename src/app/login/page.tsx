import { loginPageStyles } from "@/ui/styles/loginPageStyles";

import SocialLoginButton from "@/features/auth/ui/components/SocialLoginButton";
import type { AuthProvider } from "@/features/auth/domain/model/AuthProvider";

const providers: AuthProvider[] = ["GOOGLE", "KAKAO", "NAVER"];

export default function LoginPage() {
  return (
    <div className={loginPageStyles.container}>
      <div className={loginPageStyles.card}>

        {/* 타이틀 영역 */}
        <div className="flex flex-col gap-1 w-full">
          <h1 className={loginPageStyles.title}>로그인</h1>
        </div>

        {/* 입력 폼 */}
        <div className={loginPageStyles.formGroup}>

          {/* 아이디 */}
          <div className={loginPageStyles.inputGroup}>
            <label className={loginPageStyles.label}>아이디</label>
            <input type="text" className={loginPageStyles.input} />
          </div>

          {/* 비밀번호 */}
          <div className={loginPageStyles.inputGroup}>
            <label className={loginPageStyles.label}>비밀번호</label>
            <input type="password" className={loginPageStyles.input} />
          </div>

          {/* 로그인 버튼 */}
          <button className={loginPageStyles.loginButton}>
            로그인
          </button>
        </div>

        {/* divider */}
        <div className={loginPageStyles.divider}>
          <div className={loginPageStyles.dividerLine}></div>
          <span>또는</span>
          <div className={loginPageStyles.dividerLine}></div>
        </div>

        {/* 소셜 로그인 버튼 */}
        <div className={loginPageStyles.buttonGroup}>
          {providers.map((provider) => (
              <SocialLoginButton key={provider} provider={provider} />
          ))}
        </div>
      </div>
    </div>
  );
}