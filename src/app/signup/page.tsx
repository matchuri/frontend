"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { signupPageStyles } from "@/ui/styles/signupPageStyles";
import type { AuthProvider } from "@/features/auth/domain/model/AuthProvider";
import SocialLoginButton from "@/features/auth/ui/components/SocialLoginButton";

import { accountStorage } from "@/features/auth/infrastructure/storage/accountStorage";
import { authApi } from "@/features/auth/infrastructure/api/authApi";

const providers: AuthProvider[] = ["GOOGLE", "KAKAO", "NAVER"];

// 영문/숫자/._- 허용, 1~50자
const ID_REGEX = /^[A-Za-z0-9._-]{1,50}$/;

// 비밀번호 조건: 8자 이상 100자 이하
const PASSWORD_MIN = 8;
const PASSWORD_MAX = 100;

type IdStatus = "idle" | "invalid" | "checking" | "duplicate" | "available";

export default function SignupPage() {
  const router = useRouter();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const [idStatus, setIdStatus] = useState<IdStatus>("idle");
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * 아이디 입력 처리
   * - 즉시 형식 검증
   * - 서버 호출은 하지 않음
   */
  const handleChangeId = (value: string) => {
    setId(value);

    const loginId = value.trim();

    // 이전 타이머 제거
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (!loginId) {
      setIdStatus("idle");
      return;
    }

    // 프론트 1차 형식검사
    if (!ID_REGEX.test(loginId)) {
      setIdStatus("invalid");
      return;
    }

    // 형식 통과 → 중복확인 대기 상태
    setIdStatus("checking");
  };

  // 아이디 자동 중복 확인
  useEffect(() => {
    const loginId = id.trim();

    if (!loginId) return;
    if (!ID_REGEX.test(loginId)) return;
    if (idStatus !== "checking") return;

    debounceRef.current = setTimeout(async () => {
      try {
        const response = await authApi.checkLoginIdExists(loginId);
        console.log("아이디 조회:", response);

        /**
         * success = true
         * exists = true  => 중복
         * exists = false => 사용 가능
         */
        if (response.data.exists) {
          setIdStatus("duplicate");
          return;
        }

        setIdStatus("available");
      } catch (error) {
        console.error(
          "아이디 중복 확인 실패:",
          error
        );

        // 형식 오류
        if (
          error?.status === 400 &&
          error?.code ===
            "COMMON_INVALID_PATH_VARIABLE"
        ) {
          setIdStatus("invalid");
          return;
        }

        setIdStatus("invalid");
      }
    }, 500);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [id, idStatus]);

  // 비밀번호 유효성
  const isPasswordValid =
    password.length >= PASSWORD_MIN &&
    password.length <= PASSWORD_MAX;

   // 계속 버튼 활성화 조건
  const canSubmit =
    idStatus === "available" &&
    isPasswordValid;

  const handleSubmit = () => {
    if (!canSubmit) return;

    accountStorage.save({
      id: id.trim(),
      password: password.trim(),
      isSocial: false,
    });

    router.push("/terms");
  };

  const getIdMessage = () => {
    switch (idStatus) {
      case "invalid":
        return "영문, 숫자, ., _, - 만 사용 가능하며 1~50자여야 합니다.";
      case "checking":
        return "확인 중...";
      case "duplicate":
        return "이미 사용 중인 ID입니다.";
      case "available":
        return "사용 가능한 ID입니다.";
      default:
        return "";
    }
  };

  const getIdMessageColor = () => {
    switch (idStatus) {
      case "available":
        return "text-blue-500";
      case "duplicate":
      case "invalid":
        return "text-red-500";
      case "checking":
        return "text-gray-400";
      default:
        return "";
    }
  };

  const getPasswordMessage = () => {
    if (!password) return "";
    if (isPasswordValid) return "";
    return "비밀번호는 8자 이상 100자 이하로 입력해주세요.";
  };

  return (
    <div className={signupPageStyles.container}>
      {/* 로고 */}
      <div className="absolute top-20 flex items-center gap-2 text-2xl font-semibold text-black">
        <span>Matchuri</span>
      </div>

      <div className={signupPageStyles.card}>
        {/* 제목 */}
        <div className="flex flex-col gap-1 w-full">
          <h1 className={signupPageStyles.title}>계정 만들기</h1>
        </div>

        {/* 소셜 로그인 */}
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

        {/* 입력 영역 */}
        <div className={signupPageStyles.formGroup}>
          {/* 아이디 */}
          <div className={signupPageStyles.inputGroup}>
            <label className={signupPageStyles.label}>아이디</label>

            <input
              type="text"
              className={signupPageStyles.input}
              value={id}
              onChange={(e) => handleChangeId(e.target.value)}
              placeholder="아이디를 입력하세요"
            />

            {getIdMessage() && (
              <p className={`mt-2 text-sm ${getIdMessageColor()}`}>
                {getIdMessage()}
              </p>
            )}
          </div>

          {/* 비밀번호 */}
          <div className={signupPageStyles.inputGroup}>
            <label className={signupPageStyles.label}>비밀번호</label>

            <input
              type="password"
              className={signupPageStyles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
            />

            {getPasswordMessage() && (
              <p className="mt-2 text-sm text-red-500">
                {getPasswordMessage()}
              </p>
            )}
          </div>

          {/* 버튼 */}
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