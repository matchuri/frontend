"use client";

import { kakaoButtonStyles } from "@/ui/styles/kakaoButtonStyles";

export default function KakaoLoginButton() {
    const handleKakaoLogin = () => {
        // TODO: 카카오 로그인 연결 예정
    };

    return (
        <button
            type="button"
            onClick={handleKakaoLogin}
            className={`${kakaoButtonStyles.base} ${kakaoButtonStyles.default}`}
        >
            Kakao 계정으로 계속하기
        </button>
    );
}
