"use client";

import { nicknamePageStyles } from "@/ui/styles/nicknamePageStyles";
import { useRouter } from "next/navigation";

export default function NicknamePage() {
  const router = useRouter();

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