"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { nicknamePageStyles } from "@/ui/styles/nicknamePageStyles";
import { accountStorage } from "@/features/auth/infrastructure/storage/accountStorage";
import { termsStorage } from "@/features/terms/infrastructure/storage/termsStorage";

export default function NicknamePage() {
  const router = useRouter();

//   const [ready, setReady] = useState(false);
//   const [accountId, setAccountId] = useState("");
//   const [accountPass, setAccountPass] = useState("");
//   const [termsType, setTermsType] = useState("");
//   const [termsVersion, setTermsVersion] = useState("");

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

//     setAccountId(account.id);
//     setAccountPass(account.password);
//     setTermsType(agreements.agreementType);
//     setTermsVersion(agreements.agreementVersion);

  }, [router]);

  const handleSubmit = () => {
      router.push("/home/");
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
            <input type="text" className={nicknamePageStyles.input} />
          </div>

          {/* 가입 버튼 */}
          <div className="flex justify-end">
            <button
              className={nicknamePageStyles.button}
              onClick={handleSubmit}
            >
              가입
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}