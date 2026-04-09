"use client";

import { naverButtonStyles } from "@/ui/styles/naverButtonStyles";

export default function NaverLoginButton() {
    const handleNaverLogin = () => {
        // TODO: 네이버 로그인 연결 예정
    };

    return (
        <button
            type="button"
            className={`${naverButtonStyles.base} ${naverButtonStyles.default}`}
        >
            Naver 계정으로 계속하기
        </button>
    );
}
