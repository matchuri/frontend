"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useAtomValue } from "jotai";

import { nicknamePageStyles } from "@/ui/styles/nicknamePageStyles";
import { accountStorage } from "@/features/auth/infrastructure/storage/accountStorage";
import { termsStorage } from "@/features/terms/infrastructure/storage/termsStorage";
import { authApi } from "@/features/auth/infrastructure/api/authApi";

import { onboardingAtom } from "@/features/auth/application/selectors/authSelectors";
import { useSubmitMyNickname } from "@/features/auth/application/hooks/useSubmitMyNickname";

type NicknameStatus =
  | "idle"
  | "invalid"
  | "checking"
  | "duplicate"
  | "available";

export default function NicknamePage() {
  const router = useRouter();
  const onboarding = useAtomValue(onboardingAtom);

  const { submit: submitMyNickname, isSubmitting } = useSubmitMyNickname();
  const isSocialOnboarding = onboarding?.nextStep === "REQUIRED_NICKNAME";

  // 닉네임
  const [nickname, setNickname] = useState("");
  const [nicknameStatus, setNicknameStatus] = useState<NicknameStatus>("idle");

  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // 가입 버튼 활성화: 닉네임 사용 가능 + 제출 중 아님
  const canSubmit = nicknameStatus === "available" && !isSubmitting;

  // 일반 회원가입 데이터 로딩
  useEffect(() => {
    const account = accountStorage.load();
    const savedAgreements = termsStorage.load();

    const isGeneralSignup =
      !!account && !!savedAgreements && savedAgreements.length > 0;

    // 1. 일반 회원가입 흐름
    if (isGeneralSignup) return;

    // 2. 소셜 온보딩: 닉네임 단계
    if (onboarding?.nextStep === "REQUIRED_NICKNAME") return;

    // 3. 소셜 온보딩: 약관 단계로 돌아가야 하는 상태
    if (onboarding?.nextStep === "REQUIRED_AGREEMENTS") {
      router.replace("/terms");
      return;
    }

    // 4. 소셜 온보딩 완료 상태
    if (onboarding?.nextStep === "READY") {
      router.replace("/home");
      return;
    }

    // 5. onboarding이 아직 null이면 auth 초기화/상태 반영 대기
    if (onboarding === null) {
      return;
    }

    // 6. 여기까지 왔으면 일반 회원가입 데이터도 없고 온보딩 상태도 맞지 않는 비정상 접근
    router.replace("/signup");

  }, [router, onboarding]);

   // 닉네임 입력 시 즉시 유효성 검사
  const handleChangeNickname = (value: string) => {
    setNickname(value);

    const trimmed = value.trim();

    // 이전 타이머 제거
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // 빈 값
    if (value.length === 0) {
      setNicknameStatus("idle");
      return;
    }

    // 최대 100자 && 공백만 있는 값 방지
    if (trimmed.length === 0 || trimmed.length > 100) {
      setNicknameStatus("invalid");
      return;
    }

    // 유효성 통과 → 중복확인 시작 준비
    setNicknameStatus("checking");
  };

   // 닉네임 중복 검사
  useEffect(() => {
    const trimmed = nickname.trim();

    if (!trimmed) return;
    if (trimmed.length > 100) return;
    if (nicknameStatus !== "checking") return;

    debounceRef.current = setTimeout(async () => {
      try {
        const response = await authApi.checkNicknameExists(trimmed);
        console.log("닉네임 확인:", response.data);

        if (response.data.exists) {
          setNicknameStatus("duplicate");
          return;
        }

        setNicknameStatus("available");
      } catch (error) {
        console.error("닉네임 확인 실패:", error);
        setNicknameStatus("invalid");
      }
    }, 500);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [nickname, nicknameStatus]);

  const handleSubmit = async () => {
    if (!canSubmit) return;

    try {
      // 소셜 온보딩
      if (isSocialOnboarding) {
        await submitMyNickname(nickname.trim());
        return;
      }

      const account = accountStorage.load();
      const savedAgreements = termsStorage.load();

      if (!account || !savedAgreements || savedAgreements.length === 0) {
        router.replace("/signup");
        return;
      }

      // 일반 회원가입
      const payload = {
        loginId: account.id,
        password: account.password,
        nickname: nickname.trim(),
        agreements: savedAgreements
          .filter((item) => item.agreed)
          .map((item) => ({
            agreementType: item.agreementType,
            agreementVersion: item.agreementVersion,
          })),
      };

      console.log("회원가입 요청:", payload);

      const response = await authApi.signup(payload);

      if (response.success) {
        accountStorage.clear();
        termsStorage.clear();

        router.push("/");
        return;
      }

      router.push("/login");
    } catch (error) {
      console.error("회원가입 실패:", error);
      router.push("/login");
    }
  };

  const getMessage = () => {
    switch (nicknameStatus) {
      case "invalid":
        return "닉네임은 공백만 입력할 수 없고 최대 100자까지 가능합니다.";
      case "checking":
        return "확인 중...";
      case "duplicate":
        return "이미 사용 중인 닉네임입니다.";
      case "available":
        return "사용 가능한 닉네임입니다.";
      default:
        return "";
    }
  };

  const getMessageColor = () => {
    switch (nicknameStatus) {
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

  return (
    <div className={nicknamePageStyles.container}>
      <div className={nicknamePageStyles.card}>

        {/* 타이틀 영역 */}
        <div className="flex flex-col gap-1 w-full">
          <h1 className={nicknamePageStyles.title}>닉네임 설정</h1>
        </div>

        {/* 입력 폼 */}
        <div className={nicknamePageStyles.formGroup}>

          {/* 닉네임 */}
          <div className={nicknamePageStyles.inputGroup}>
            <label className={nicknamePageStyles.label}>닉네임</label>
            <input
              type="text"
              className={nicknamePageStyles.input}
              value={nickname}
              onChange={(e) =>
                handleChangeNickname(e.target.value)
              }
              placeholder="닉네임을 입력하세요"
            />

            {getMessage() && (
              <p
                className={`mt-2 text-sm ${getMessageColor()}`}
              >
                {getMessage()}
              </p>
            )}
          </div>

          {/* 가입 버튼 */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!canSubmit}
              className={
                canSubmit
                  ? nicknamePageStyles.button
                  : `${nicknamePageStyles.button} opacity-50 cursor-not-allowed`
              }
            >
              가입
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}