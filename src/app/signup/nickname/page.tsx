"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { nicknamePageStyles } from "@/ui/styles/nicknamePageStyles";
import { accountStorage } from "@/features/auth/infrastructure/storage/accountStorage";
import { termsStorage } from "@/features/terms/infrastructure/storage/termsStorage";
import { authApi } from "@/features/auth/infrastructure/api/authApi";

import type { TermsAgreement } from "@/features/terms/domain/model/termsAgreement";

type NicknameStatus =
  | "idle"
  | "invalid"
  | "checking"
  | "duplicate"
  | "available";

export default function NicknamePage() {
  const router = useRouter();

  // 이전 단계 데이터
  const [accountId, setAccountId] = useState("");
  const [accountPass, setAccountPass] = useState("");
  const [agreements, setAgreements] = useState<TermsAgreement[]>([]);

  // 닉네임
  const [nickname, setNickname] = useState("");
  const [nicknameStatus, setNicknameStatus] =
    useState<NicknameStatus>("idle");

  // 가입 처리
  const [submitting, setSubmitting] = useState(false);

  const debounceRef = useRef<NodeJS.Timeout | null>(null);

   // 가입 버튼 활성화: 닉네임 사용 가능 + 제출 중 아님
  const canSubmit =
    nicknameStatus === "available" &&
    !submitting;

  useEffect(() => {
    const account = accountStorage.load();
    const agreements = termsStorage.load();

    // 이전 단계 데이터 없으면 회원가입 첫 단계로 이동
    if (!account || !agreements || agreements.length === 0) {
      router.replace("/signup");
      return;
    }

    // 콘솔 확인용
    console.log("accountStorage:", account);
    console.log("termsStorage:", agreements);

    setAccountId(account.id);
    setAccountPass(account.password);
    setAgreements(agreements);
  }, [router]);

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

    // 최대 100자
    if (trimmed.length > 100) {
      setNicknameStatus("invalid");
      return;
    }

    // 공백만 있는 값 방지
    if (trimmed.length === 0) {
      setNicknameStatus("invalid");
      return;
    }

    // 유효성 통과 → 중복확인 시작 준비
    setNicknameStatus("checking");
  };

   // 닉네임 중복 확인
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
      setSubmitting(true);

      const payload = {
        loginId: accountId,
        password: accountPass,
        nickname: nickname.trim(),
        agreements: agreements
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

    } finally {
      setSubmitting(false);
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